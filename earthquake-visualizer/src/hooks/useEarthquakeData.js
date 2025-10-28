// src/hooks/useEarthquakeData.js
import { useEffect, useState } from "react";
import { fetchEarthquakes } from "../api/fetchEarthquakes";

export default function useEarthquakeData() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    fetchEarthquakes().then((data) => {
      setEarthquakes(data);
    });
  }, []);

  return earthquakes;
}
