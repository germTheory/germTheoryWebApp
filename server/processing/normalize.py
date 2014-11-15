import datetime

# FOR TESTING
# user1Data = [{'time': datetime.datetime(2014, 11, 9, 22, 15, 9), 'coords': (50.123344551112, 80.128888381812)}, {'time': datetime.datetime(2014, 11, 9, 22, 20, 9), 'coords': (50.1233445514612, 80.128888381922)}]


# Function takes a variety of different timed data and returns data points 
# userData: a set of position data for a specific user(sorted by time)
# times: Times for which users should be compared
def normalize(userData, times):
    data = []
    for time in times:
        surroundingIndices = approxBinarySearch(userData, time, 0) # returns a list containing the indices of the surrounding two times, returns one index if there is a match
        if len(surroundingIndices) == 1:
            # no interpolation necessary
            data.append(userData[surroundingIndices[0]])
        elif len(surroundingIndices) == 2:
            newLatLong = interpolate(userData[surroundingIndices[0]], userData[surroundingIndices[1]], time) # create a tuple of the interpolated latitude and longitude
            newDict = {'coords': (newLatLong[0], newLatLong[1]), 'time': time}
            # print(newDict)
            data.append(newDict)
        else:
            data.append(None)
    return data

# this function finds the actual latitude and longitude coordinates between two points ie 0--x--------0
def interpolate(coords1, coords2, targetTime):
    # coords 1/2 looks something like this: {coords: (latitude, longitude), time: datetime.datetime(2014, 11, 9, 22, 20, 9, tzinfo=psycopg2.tz.FixedOffsetTimezone(offset=-480, name=None))
    # we calculate the solution as follows:
    # 1. Calculate alpha -> (target time - coords1 time) / (coords2 time - coords1 time)
    # 2. solve for latitude: coords1 lat + alpha(coords2 lat - coords1 lat)
    alpha = (targetTime - coords1['time']).total_seconds() / (coords2['time'] - coords1['time']).total_seconds()
    return (coords1['coords'][0] + (alpha * (coords2['coords'][0] - coords1['coords'][0])), coords1['coords'][1] + (alpha * (coords2['coords'][1] - coords1['coords'][1])) )

# Function will search an array of times for an interval between which our times match
# All Times stored in unix time
def approxBinarySearch(tupleArray, targetTime, lo, hi = None):
    if hi is None:
        hi = len(tupleArray)
    if targetTime > tupleArray[len(tupleArray ) - 1]['time'] or targetTime < tupleArray[0]['time']:
        return ()
    while lo < hi:
        mid = (lo + hi)//2
        midval = tupleArray[mid]['time']
        if mid + 1 != len(tupleArray):
            nextval = tupleArray[mid + 1]['time']
        else:
            nextval = None
        if mid != 0:
            prevval = tupleArray[mid - 1]['time']
        else:
            prevval = None
        # does midval match our target?
        if targetTime == midval:
            return [mid]
        # test if the target fits between previous and current
        elif prevval < targetTime < midval:
            return [mid - 1, mid]
        # test if the target fits between current and next
        elif midval < targetTime < nextval:
            return [mid, mid + 1]
        elif midval < targetTime:
            lo = mid + 1
        elif midval > targetTime: 
            hi = mid
        else:
            return [mid]
    return []

# updatedUser1Data = normalize(user1Data, [datetime.datetime(2014, 11, 9, 22, 17, 9)])
# print("UPDATED USER1 INFO")
# print(updatedUser1Data)
