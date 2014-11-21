#!/usr/bin/env python
import sys
import datetime
import pytz
import math
import json
import normalize as norm
import psycopg2
import geopy
import scipy
from math import exp
from scipy.integrate import cumtrapz
from geopy.distance import great_circle

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
    threshold = arguments['threshold'] #meters
else:
    threshold = 100 #meters

if 'user' in arguments:
    userName = arguments['user']
else:
    userName = None

if 'reportName' in arguments:
    reportName = arguments['reportName'];
else:
    reportName = "Anonymous Report"

dayDifference = (endDateTime - startDateTime).days
contagiousness = 6 # hard-coded for now 
modifier = threshold * 10

def mapcount(count, contagiousness, threshold):
    # because math is fun.  See here for what this looks like: http://bit.ly/1u7DQuj
    # y = 1 - exp(-bx), where b = con/(thresh*300) and x = count
    return 1 - math.exp((-1)*(contagiousness/(threshold * (modifier/timeInterval) * dayDifference )) * count)

try:
    conn = psycopg2.connect("dbname='dnihfp6jn1o20' user='u736nm030ufb7r' host='ec2-54-243-237-213.compute-1.amazonaws.com' password='p4mkfm0sdqv8n2ergt79tuhuta1' port='5442'")
    print("Connected to Database")
except:
    print("Unable to connect to the database.")

cur = conn.cursor()
# find disease Id and relevant information about it
cur.execute('SELECT id, contagiousness FROM diseases WHERE name = %s', (diseaseName,))
diseaseData = cur.fetchall()[0] # get the first item in the returned function
diseaseId = diseaseData[0]

# denote that we have a new report 
cur.execute('INSERT INTO proximity_reports (name, threshold, created_at, updated_at, disease_id) VALUES (%s, %s, %s, %s, %s)', [reportName, threshold, datetime.datetime.now(), datetime.datetime.now(), diseaseId])
cur.execute('SELECT * FROM proximity_reports WHERE name = %s', [reportName,])
reportId = cur.fetchall()[0][0]

# find users that have been confirmed infected with the disease
infectedUsers = {}
usersInProximity = {}
if userName == None:
    # Get All diseased locations in the following format:
    #(14, 37.7890480964603, -122.424191045913, datetime.datetime(2014, 11, 6, 16, 20, 2, 387000, tzinfo=psycopg2.tz.FixedOffsetTimezone(offset=-480, name=None)))
    cur.execute('SELECT locations.user_id, locations.latitude, locations.longitude, locations.date FROM user_diseases, locations WHERE locations.user_id = user_diseases.user_id AND user_diseases.disease_id = %s AND date > %s AND date < %s ORDER BY user_id ASC;', [diseaseId, startDateTime, endDateTime]);
    data = cur.fetchall()
    # Iterate through infected locations, determining if any users were in range
    curU = conn.cursor()
    for entry in data:
      userId = entry[0]
      lat = entry[1]
      lon = entry[2]
      currentTime = entry[3].replace(tzinfo=pytz.UTC)
      if userId in infectedUsers:
        infectedUsers[userId].append( { 'coords': (lat, lon), 'time': currentTime } )
      else:
        infectedUsers[userId] = [ { 'coords': (lat, lon), 'time': currentTime } ]
      # find all users who have been in the vicinity of the infected user
      curU.execute('SELECT user_id, latitude, longitude, date FROM locations WHERE @((EXTRACT(EPOCH FROM date - %s))::Integer) < %s AND earth_distance(ll_to_earth(%s, %s), ll_to_earth( latitude, longitude)) < %s ORDER BY date ASC', [currentTime, timeInterval, lat, lon, threshold])
      dataUser = curU.fetchall()
      if dataUser:
        for entryU in dataUser:
          print("Adding User %s to list of Nearby users" % entryU[0])
          userIdP = entryU[0]
          userLat = entryU[1]
          userLon = entryU[2]
          userTime = entryU[3].replace(tzinfo=pytz.UTC)
          if userIdP in usersInProximity:
            usersInProximity[userIdP].append( userTime )
          else:
            usersInProximity[userIdP] = [ userTime ]
else:
    cur.execute('SELECT * FROM users WHERE name=%s;', [userName,]);
    newId = cur.fetchall()[0][0]
    usersInProximity[newId] = [];

cur.execute('SELECT user_id, latitude, longitude, date FROM locations WHERE date > %s AND date < %s', [startDateTime - datetime.timedelta(0, 50000), endDateTime + datetime.timedelta(0, 50000)])
allLocationData = cur.fetchall()

parsedData = norm.parseData(allLocationData, infectedUsers, usersInProximity, timeInterval, startDateTime, endDateTime);
proximalUserLocations = parsedData[0]
infectedLocs = parsedData[1]
extras = parsedData[2]
numOfTimes = parsedData[3]
results = {}
for userId in proximalUserLocations:
    print('Calculating index for user %s of %s' % (userId, len(proximalUserLocations)) )
    user = proximalUserLocations[userId]
    count = 0;
    for infectedId in infectedLocs:
        infected = infectedLocs[infectedId]
        distances = [] # to be our y values
        for idx, val in enumerate(user):
            if val == None or infected[idx] == None:
                distances.append(None)
            else:
                distances.append(great_circle(val['coords'], infected[idx]['coords']).meters)
        belowthreshold = False
        belowdata = []
        for idx, distance in enumerate(distances):
            if  distance == None or (belowthreshold == False and distance > threshold):
                continue
            # check if we're at the end
            elif (belowthreshold == True and distance > threshold) or (belowthreshold == True and idx == len(distances) - 1):
                if len(belowdata) > 1:
                  count += (threshold * (len(belowdata) - 1)) - cumtrapz(belowdata, dx = 1)
                elif len(belowdata) == 1:
                  print(threshold - belowdata[0])
                  count += threshold - belowdata[0]
                belowdata = []
                belowthreshold = False
            elif belowthreshold == False and distance < threshold:
                belowthreshold = True
                belowdata.append(distance)
            elif belowthreshold == True and distance < threshold:
                belowdata.append(distance)
            else:
                continue
    results[userId] = mapcount(count, contagiousness, threshold)
    print('Found an %s index of %s' % (diseaseName, results[userId]));
    cur.execute('INSERT INTO proximity (value, created_at, updated_at, user_id, disease_id, report_id) VALUES (%s, %s, %s, %s, %s, %s);', (results[userId], datetime.datetime.utcnow(), datetime.datetime.utcnow(), userId, diseaseId, reportId))

for userId in extras:
  cur.execute('INSERT INTO proximity (value, created_at, updated_at, user_id, disease_id, report_id) VALUES (0, %s, %s, %s, %s, %s);', (datetime.datetime.utcnow(), datetime.datetime.utcnow(), userId, diseaseId, reportId))

conn.commit()
cur.close()
curU.close()
conn.close()
