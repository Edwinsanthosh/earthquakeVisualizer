import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchEarthquakes } from "../api/fetchEarthquakes";
import statesGeoJSON from "../data/world.geo.json";
import * as turf from "@turf/turf";

const EarthquakeContext = createContext();

export function EarthquakeProvider({ children }) {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    fetchEarthquakes().then((data) => setEarthquakes(data));
  }, []);

  // ✅ Compute state counts once and store
  const stateCounts = useMemo(() => {
    const counts = {};
    earthquakes.forEach((eq) => {
      const [lng, lat] = eq.geometry.coordinates;
      const point = turf.point([lng, lat]);

      statesGeoJSON.features.forEach((state) => {
        if (turf.booleanPointInPolygon(point, state)) {
          const name = state.properties.name || state.properties.NAME_1;
          counts[name] = (counts[name] || 0) + 1;
        }
      });
    });
    return counts;
  }, [earthquakes]);

  return (
    <EarthquakeContext.Provider value={{ earthquakes, stateCounts, statesGeoJSON }}>
      {children}
    </EarthquakeContext.Provider>
  );
}

export function useEarthquakeContext() {
  return useContext(EarthquakeContext);
}
