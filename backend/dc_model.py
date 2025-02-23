import pandas as pd
import numpy as np
from sklearn.neighbors import KernelDensity
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from geopy.distance import great_circle

df = pd.read_csv('data/DC.csv')

df['REPORT_DAT'] = pd.to_datetime(df['REPORT_DAT'])
df['hour'] = df['REPORT_DAT'].dt.hour
df = df.dropna(subset=['LATITUDE', 'LONGITUDE'])


coords = df[['LATITUDE', 'LONGITUDE']].values
kde = KernelDensity(bandwidth=0.01, kernel='gaussian')
kde.fit(coords)


# Increase grid resolution by using more points
n_points = 200
lon_min, lon_max = df['LONGITUDE'].min(), df['LONGITUDE'].max()
lat_min, lat_max = df['LATITUDE'].min(), df['LATITUDE'].max()
lon_lin = np.linspace(lon_min, lon_max, n_points)
lat_lin = np.linspace(lat_min, lat_max, n_points)
lon_grid, lat_grid = np.meshgrid(lon_lin, lat_lin)
grid_coords = np.vstack([lat_grid.ravel(), lon_grid.ravel()]).T


log_density = kde.score_samples(grid_coords)
density = np.exp(log_density).reshape(lon_grid.shape)
norm_density = (density - density.min()) / (density.max() - density.min())

safety_score = 1 - norm_density #Higher = safer

max_idx = np.unravel_index(np.argmax(safety_score), safety_score.shape)
min_idx = np.unravel_index(np.argmin(safety_score), safety_score.shape)
safest_location = (lat_grid[max_idx], lon_grid[max_idx])
most_dangerous_location = (lat_grid[min_idx], lon_grid[min_idx])
print("Safest location (lat, lon):", safest_location)
print("Most dangerous location (lat, lon):", most_dangerous_location)


hour_safety = {}
for h in sorted(df['hour'].unique()):
    df_hour = df[df['hour'] == h]
    if len(df_hour) < 5:
        print(f"Skipping hour {h} due to insufficient data points.")
        continue
    coords_h = df_hour[['LATITUDE', 'LONGITUDE']].values
    kde_h = KernelDensity(bandwidth=0.01, kernel='gaussian')
    kde_h.fit(coords_h)

    log_density_h = kde_h.score_samples(grid_coords)
    density_h = np.exp(log_density_h).reshape(lon_grid.shape)
    norm_density_h = (density_h - density_h.min()) / (density_h.max() - density_h.min())
    safety_score_h = 1 - norm_density_h
    avg_safety = np.mean(safety_score_h)
    hour_safety[h] = avg_safety

safest_time = max(hour_safety, key=hour_safety.get)
most_dangerous_time = min(hour_safety, key=hour_safety.get)
print("Safest hour (time):", safest_time)
print("Most dangerous hour (time):", most_dangerous_time)

# ------------------------------
# Time Analysis: Most Dangerous Safety by Hour
# ------------------------------
def calculate_distance(row):
    crime_location = (row['LATITUDE'], row['LONGITUDE'])
    return great_circle(most_dangerous_location, crime_location).meters  # Distance in meters

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