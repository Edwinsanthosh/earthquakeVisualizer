// src/api/fetchEarthquakes.js
export async function fetchEarthquakes() {
  const url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.features; // Return only earthquake features array
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    return [];
  }
}
