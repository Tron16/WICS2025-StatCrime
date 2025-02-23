import pandas, csv, geopy
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
path = "data/Chicago.json"
data = pandas.read_json(path)
data['date'] = pandas.to_datetime(data['date'])
data['hour'] = data['date'].dt.hour
data["weekday"] = data['date'].dt.day_of_week
print(data[['date','hour','weekday', 'latitude','longitude','primary_type']].head())
locator = Nominatim(user_agent="chicago_crime_zip")
reverse = RateLimiter(locator.reverse, min_delay_seconds=1)
def getZIP(lat, lon):
    location = reverse((lat, lon), exactly_one = True)
    if location and 'postcode' in location.raw['address']:
        return location.raw['address']['postcode']
    return None
data['zip'] = data.apply(lambda row: getZIP(row['latitude'], row['longitude'],axis=1))
print(data[['date', 'latitude', 'longitude', 'zip']])

