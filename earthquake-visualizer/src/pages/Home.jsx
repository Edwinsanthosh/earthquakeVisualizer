import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import useEarthquakeData from "../hooks/useEarthquakeData";
import "../styles/Home.css"; // 👈 we’ll add this next

export default function Home() {
  const allEarthquakes = useEarthquakeData();
  const [minMag, setMinMag] = useState(0);

  const filtered = allEarthquakes.filter(
    (eq) => eq.properties.mag >= minMag
  );

  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Sidebar earthquakes={filtered} onFilterChange={setMinMag} />
        <MapView earthquakes={filtered} />
      </div>
    </div>
  );
}
