#!/usr/bin/env python
import sys
import json
import datetime
import pytz
import math
import normalize as norm
import psycopg2
import geopy
import scipy
from math import exp
from scipy.integrate import simps
from geopy.distance import vincenty
from random import randrange

# To be command line arguments

arguments = json.loads(sys.argv[1])
print(arguments)

if 'timeInterval' in arguments:
    timeInterval = arguments['timeInterval']
else:
    timeInterval = 180 # 3 minutes

if 'startTime' in arguments and 'endTime' in arguments:
    startDateTime = datetime.datetime.strptime(arguments['startTime'], "%Y-%m-%dT%H:%M:%S.%fZ")
    endDateTime =  datetime.datetime.strptime(arguments['endTime'], "%Y-%m-%dT%H:%M:%S.%fZ")
else:
    raise Exception("did not provide start and end time values")

if 'diseaseName' in arguments:
    diseaseName = arguments['diseaseName']
else:
    diseaseName = 'Ebola'

if 'threshold' in arguments:
    threshold = arguments['threshold'] #feet
else:
    threshold = 150 #feet

if 'user' in arguments:
    userName = arguments['user']
else:
    userName = None


dayDifference = (endDateTime - startDateTime).days
contagiousness = 6 # hard-coded for now 
modifier = threshold * 10

def parseData(allData, infectedUserData, interval):
    # iterate through data, assigning it to dictionaries, one for infected people and another for regular users
    # each item in data looks like: (id, latitude, longitude, created_at, updated_at, user_id)
    userLocs = {}
    infectedLocs = {}
    for userEntry in allData:
        currentTime = userEntry[locTime]
        lat = userEntry[locLat]
        long = userEntry[locLong]
        userId = userEntry[locUserId]
        # if already in our data structure, we can assign new location coordinates
        if userId in userLocs:
            userLocs[userId].append( { 'coords': (lat, long), 'time': currentTime } )
        elif userId in infectedLocs:
            infectedLocs[userId].append( { 'coords': (lat, long), 'time': currentTime } )
        # if not, check if they are infected and then add them to the apropriate table
        else:
            if userId in infectedUserData:
                infectedLocs[userId] = [ { 'coords': (lat, long), 'time': currentTime } ]
            else:
                userLocs[userId] = [ { 'coords': (lat, long), 'time': currentTime } ]
    times = []
    current = startDateTime
    interval = datetime.timedelta(0, interval)
    while current <= endDateTime:
        times.append(current)
        current += interval
    for userEntry in userLocs:
        # sort user data and then normalize it for 2 minute intervals
        userLocs[userEntry] = norm.normalize(sorted(userLocs[userEntry], key=lambda k: k['time']), times)
        print("Processed User %s" % (userEntry))
    print('ALL USERS PROCESSED')
    for infectedEntry in infectedLocs:
        infectedLocs[infectedEntry] = norm.normalize(sorted(infectedLocs[infectedEntry], key=lambda k: k['time']), times)
        print("Processed Infected %s" % (infectedEntry))
    print('ALL INFECTED PRE-PROCESSED...now for the hard part.')
    return (userLocs, infectedLocs, len(times))

def mapcount(count, contagiousness, threshold):
    # because math is fun.  See here for what this looks like: http://bit.ly/1u7DQuj
    # y = 1 - exp(-bx), where b = con/(thresh*300) and x = count
    return 1 - math.exp((-1)*(contagiousness/(threshold * (modifier/timeInterval) * dayDifference )) * count)


# used for convenience in case the schema is changed later, saves indexes of location values
locId = 0
locUserId = 6
locLat = 1
locLong = 2
locTime = 3

try:
    conn = psycopg2.connect("dbname='d21pkb4ibembvk' user='uer1d0n84nrcv8' host='ec2-54-243-218-135.compute-1.amazonaws.com' password='p81tjh25nn1g288d13fmt54kro3'")
    print("Connected to Database")
except:
    print("Unable to connect to the database.")

# find disease Id and relevant information about it
cur = conn.cursor()
cur.execute('SELECT * FROM diseases WHERE name = %s;', (diseaseName,))
diseaseData = cur.fetchall()[0] # get the first item in the returned function
diseaseId = diseaseData[0]
if userName != None:
    cur.execute('SELECT * FROM users WHERE name = %s', (userName,))
    userData = cur.fetchall()[0]
    userId = userData[0]

# find users that have been confirmed infected with the disease
cur.execute('SELECT * FROM user_diseases WHERE disease_id = %s;', (diseaseId,))
infectedList = [entry[2] for entry in cur.fetchall()]
infectedUsers = {}
for user in infectedList:
    infectedUsers[user] = {} # this will eventually store disease information about the user

# get all location data during the time we're concened with. created after start and before end
if userName == None:
    cur.execute('SELECT * FROM locations WHERE date > %s AND date < %s', (startDateTime - datetime.timedelta(0, 50000), endDateTime + datetime.timedelta(0, 50000)))
    data = cur.fetchall()
else:
    cur.execute('SELECT * FROM locations WHERE date > %s AND date < %s AND user_id = %s', (startDateTime - datetime.timedelta(0, 50000), endDateTime + datetime.timedelta(0, 50000), userId))
    data = cur.fetchall()
    for infected in infectedList:
        cur.execute('SELECT * FROM locations WHERE date > %s AND date < %s AND user_id = %s', (startDateTime - datetime.timedelta(0, 50000), endDateTime + datetime.timedelta(0, 50000), infected))
        tempData = cur.fetchall()
        for item in tempData:
            data.append(item)


# parse and normalize data
mainData = parseData(data, infectedUsers, timeInterval)
results = {}
cur2 = conn.cursor()
numOfTimes = mainData[2]
infectedLocs = mainData[1]
userLocs = mainData[0]
for userId in userLocs:
    print('Calculating index for user %s of %s' % (userId, len(userLocs)) )
    user = userLocs[userId]
    count = 0;
    for infectedId in infectedLocs:
        infected = infectedLocs[infectedId]
        distances = [] # to be our y values
        for idx, val in enumerate(user):
            if val == None or infected[idx] == None:
                distances.append(None)
            else:
                distances.append(vincenty(val['coords'], infected[idx]['coords']).feet)
        belowthreshold = None
        belowdata = []
        for idx, distance in enumerate(distances):
            if  distance == None or (belowthreshold == None and distance > threshold):
                continue
            # check if we're at the end
            elif (belowthreshold == True and distance > threshold) or (belowthreshold == True and idx == len(distances) - 1):
                # TODO: calculate distance
                count += (threshold * (len(belowdata) - 1)) - simps(belowdata, dx = 1)
                belowdata = []
                belowthreshold = None
            elif belowthreshold == None and distance < threshold:
                belowthreshold = True
                belowdata.append(distance)
            elif belowthreshold == True and distance < threshold:
                belowdata.append(distance)
            else:
                continue
    results[userId] = mapcount(count, contagiousness, threshold)
    print('Found an %s index of %s' % (diseaseName, results[userId]));
    cur2.execute('INSERT INTO proximity (value, created_at, updated_at, user_id, disease_id) VALUES (%s, %s, %s, %s, %s);', (results[userId], datetime.datetime.utcnow(), datetime.datetime.utcnow(), userId, diseaseId))
conn.commit()
cur.close()
cur2.close()
conn.close()
