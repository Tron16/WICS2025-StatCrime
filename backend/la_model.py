import pandas as pd
import numpy as np
from datetime import datetime as dt
from sklearn.neighbors import KernelDensity
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from geopy.distance import great_circle


df = pd.read_csv('data/LA.csv')

def getTime(time):
  hours = 0
  minutes = 0
  time = str(time)
  if(len(time)==3):
    hours = time[0:1]
    minutes = time[1:]
  elif(len(time)==4):
    hours = time[0:2]
    minutes = time[2]
  return dt.strptime(f"{hours}:{minutes}", "%H:%M")
    
df["TIME_OCC"] = df['TIME_OCC'].apply(getTime)
df['hour'] = df['TIME_OCC'].dt.hour
df = df.dropna(subset=['LAT', 'LON'])


# ------------------------------
# Overall Spatial Safety Score
# ------------------------------
coords = df[['LAT', 'LON']].values
kde = KernelDensity(bandwidth=0.01, kernel='gaussian')
kde.fit(coords)


n_points = 200
lon_min, lon_max = df['LON'].min(), df['LON'].max()
lat_min, lat_max = df['LAT'].min(), df['LAT'].max()
lon_lin = np.linspace(lon_min, lon_max, n_points)
lat_lin = np.linspace(lat_min, lat_max, n_points)
lon_grid, lat_grid = np.meshgrid(lon_lin, lat_lin)
grid_coords = np.vstack([lat_grid.ravel(), lon_grid.ravel()]).T



log_density = kde.score_samples(grid_coords)
density = np.exp(log_density).reshape(lon_grid.shape)
norm_density = (density - density.min()) / (density.max() - density.min())
safety_score = 1 - norm_density


max_idx = np.unravel_index(np.argmax(safety_score), safety_score.shape)
min_idx = np.unravel_index(np.argmin(safety_score), safety_score.shape)
safest_location = (lat_grid[max_idx], lon_grid[max_idx])
most_dangerous_location = (lat_grid[min_idx], lon_grid[min_idx])
print("Safest location (lat, lon):", safest_location)
print("Most dangerous location (lat, lon):", most_dangerous_location)

#-------------------------------
# Safety by Hour in the Most Dangerous Location
#-------------------------------
def calculate_distance(row):
    crime_location = (row['LAT'], row['LON'])
    return great_circle(most_dangerous_location, crime_location).meters
df['distance_to_danger'] = df.apply(calculate_distance, axis=1)
nearest_100_crimes = df.nsmallest(100, 'distance_to_danger')
hourly_crime_counts_top_100 = nearest_100_crimes.groupby('hour').size()
hour_safety_top_100 = 1 / (hourly_crime_counts_top_100 + 1)  
safest_time_top_100 = hourly_crime_counts_top_100.idxmin()
most_dangerous_time_top_100 = hourly_crime_counts_top_100.idxmax()
print("\nHourly Safety Scores for Top 100 Crimes Near Most Dangerous Location:")
sumMostDangeruous = 0
averageMostDangerous = 0
for hour, score in hour_safety_top_100.items():
    print(f"Hour {hour}:00 - Safety Score: {score:.4f}")

print("Safest hour (Top 100 crimes):", safest_time_top_100)
print("Most dangerous hour (Top 100 crimes):", most_dangerous_time_top_100)
print("Average Hourly Safety Score:" + str(averageMostDangerous))

# ------------------------------
# Time Analysis: Overall Safety by Hour
# ------------------------------

hour_safety = {}
for h in sorted(df['hour'].unique()):
    df_hour = df[df['hour'] == h]
    if len(df_hour) < 5:
        print(f"Skipping hour {h} due to insufficient data points.")
        continue
    coords_h = df_hour[['LAT', 'LON']].values
    kde_h = KernelDensity(bandwidth=0.01, kernel='gaussian')
    kde_h.fit(coords_h)

    log_density_h = kde_h.score_samples(grid_coords)
    density_h = np.exp(log_density_h).reshape(lon_grid.shape)
    norm_density_h = (density_h - density_h.min()) / (density_h.max() - density_h.min())
    safety_score_h = 1 - norm_density_h
    avg_safety = np.mean(safety_score_h)
    hour_safety[h] = avg_safety

hour_counts = df['hour'].value_counts().sort_index()

safest_time = max(hour_safety, key=hour_safety.get)
most_dangerous_time = min(hour_safety, key=hour_safety.get)
print("Safest hour (time):", safest_time)
print("Most dangerous hour (time):", most_dangerous_time)


# ------------------------------
# Visualization
# ------------------------------


# Reverse the white->red list so that the first color (lowest safety) is red
my_colors = [
   '#a50f15',  # deep red (for the most dangerous / lowest safety)
   '#de2d26',
   '#fb6a4a',
   '#fcae91',
   '#fee5d9',
   '#ffffff'   # white (for the safest / highest safety)
]
custom_reds = LinearSegmentedColormap.from_list('custom_reds', my_colors, N=256)


# Plot overall safety score heatmap
plt.figure(figsize=(10, 8), dpi=300)
plt.imshow(
   safety_score,
   extent=(lon_min, lon_max, lat_min, lat_max),
   origin='lower',
   cmap=custom_reds
)
plt.title('LA Safety Score Heatmap (1 = Safest, 0 = Most Dangerous)')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.colorbar(label='Safety Score')
plt.scatter(
   [safest_location[1]],
   [safest_location[0]],
   color='blue', marker='o', s=50, label='Safest Spot'
)
plt.scatter(
   [most_dangerous_location[1]],
   [most_dangerous_location[0]],
   color='red', marker='x', s=50, label='Most Dangerous Spot'
)
plt.legend()
plt.show()


# Plot average safety score by hour
plt.figure(figsize=(10, 4), dpi=300)
plt.plot(list(hour_safety.keys()), list(hour_safety.values()), marker='o', linestyle='-')
plt.xlabel('Hour of Day')
plt.ylabel('Average Safety Score')
plt.title('Average Safety Score by Hour')
plt.grid(True)
plt.show()