

# 🌍 Earthquake Map Visualization — Project Documentation

## Overview

This application visualizes **global earthquake events** on an **interactive Leaflet map**.
The map displays:

1. **Shaded States/Regions**

   * Only states that have at least one earthquake event are highlighted.
   * The shade intensity increases based on **how many earthquake events** occurred in that state.

2. **Earthquake Event Markers**

   * Each earthquake is represented by a **Circle Marker**, sized according to the **magnitude** of the earthquake.
   * Clicking the marker shows details: location, magnitude, depth, and time.

3. **Ripple / Pulse Animation (Impact Effect)**

   * Earthquakes with magnitude ≥ *4.0* show a **dynamic expanding ripple** to visually represent intensity.
   * Larger quakes produce **larger and slower** ripple animations.

This combination gives a **macro → micro** view:

* At zoomed-out levels → You see *which regions faced more earthquake activity.*
* At zoomed-in levels → You see *exact earthquake positions*, magnitudes, and timings.

---

## Data Flow

```
API → fetchEarthquakes() → useEarthquakeData() → MapView.jsx → Markers + State Shading + Ripples
```

### `fetchEarthquakes()`

* Calls the USGS real-time earthquake feed.
* Returns raw earthquake event data.

### `useEarthquakeData()`

* Runs once when the app loads.
* Stores earthquake list in local React state.
* Prevents repeated re-fetching.

### `MapView.jsx`

Responsible for:

* Rendering the **map**
* Shading states based on event density
* Rendering event markers
* Adding ripple animations for high-magnitude quakes

---

## Shading Logic (Regional View)

We loop through all earthquakes and count how many fall inside each state polygon:

```
State Polygon + Earthquake Coordinate → Point-in-Polygon Check
```

Based on count:

| Event Count | Color Shade     | Meaning         |
| ----------- | --------------- | --------------- |
| 0           | Transparent     | No activity     |
| 1 - 3       | Light Orange    | Low activity    |
| 4 - 9       | Moderate Orange | Medium activity |
| 10+         | Strong Orange   | High activity   |

This gives a **heat visualization**, but **only on states that have earthquake activity** — *not entire countries*.

---

## Marker Rendering (Zoomed View)

Each earthquake is shown using:

* A `CircleMarker`
* Marker size = depends on **map zoom** and **earthquake magnitude**
* Popup shows:

  * Place
  * Magnitude
  * Depth (km)
  * Local timestamp

### Marker Size Rules

| Zoom Level | Marker Size                    |
| ---------- | ------------------------------ |
| Far Out    | Small circles                  |
| Mid Zoom   | Medium circles                 |
| Close Zoom | Larger circles (for precision) |

---

## Ripple Animation Logic

Earthquakes with **magnitude ≥ 4.0** get a ripple effect.

### How it Works

* Creates an invisible Leaflet Circle (`L.circle`)
* Radius expands smoothly using `requestAnimationFrame`
* Opacity fades out while radius grows
* Animation loops continuously (`pulse = true`)

This creates a **wave impact effect**, helping users **spot strong quakes instantly**.

### Ripple Strength Formula

```
maxRadius = magnitude * 24000 meters
duration = baseTime + magnitude * 200
```

So **bigger quakes → bigger + slower ripple**.

---

## Customization Options

| Feature                    | Location                             | Example Change                  |
| -------------------------- | ------------------------------------ | ------------------------------- |
| Change ripple threshold    | `showRipple = mag >= 4;`             | Set to `>= 5` for fewer ripples |
| Change shading sensitivity | `getStateColor()`                    | Tune color value steps          |
| Remove ripples entirely    | Remove `<RippleMarker />`            | Clean static visual mode        |
| Show only recent quakes    | Filter data in `useEarthquakeData()` | Reduce clutter                  |

---

## File Structure Summary

```
src/
│
├── api/
│   └── fetchEarthquakes.js
│
├── hooks/
│   └── useEarthquakeData.js
│
├── components/
│   ├── MapView.jsx        ← Main map logic
│   └── RippleMarker.jsx   ← Animated pulse effect
│
└── data/
    └── world-states.geo.json
```

---

## Final Result (Visual Behavior)

Zoomed Out ➝
✅ Region heat visualization based on total earthquake activity

Zoomed In ➝
✅ Individual earthquake markers with informative popups
✅ Large quakes pulse visually

This gives **both analytics and real-time awareness** in one unified view.
