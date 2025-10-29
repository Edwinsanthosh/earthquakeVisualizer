import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from "react-leaflet";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import getMarkerColor from "../utils/getMarkerColor";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const { earthquakes, stateCounts, statesGeoJSON } = useEarthquakeContext();
  const center = [20, 78];

  const getStateColor = (count) => {
    if (!count) return "transparent";
    if (count < 3) return "#FFE7BA";
    if (count < 10) return "#FFB56B";
    return "#FF7043";
  };

  const stateStyle = (feature) => {
    const name = feature.properties.name || feature.properties.NAME_1;
    const count = stateCounts[name] || 0;

    return {
      fillColor: getStateColor(count),
      fillOpacity: count ? 0.55 : 0,
      color: count ? "#b34700" : "transparent",
      weight: count ? 1 : 0.5,
    };
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={center} zoom={3} minZoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON data={statesGeoJSON} style={stateStyle} />

        <DynamicMarkers earthquakes={earthquakes} />
      </MapContainer>
    </div>
  );
}

function DynamicMarkers({ earthquakes }) {
  const map = useMap();
  const zoom = map.getZoom();

  return earthquakes.map((eq) => {
    const [lng, lat, depth] = eq.geometry.coordinates;
    const mag = eq.properties.mag;
    const place = eq.properties.place;
    const color = getMarkerColor(mag);

    const size = zoom < 4 ? mag * 1.0 : zoom < 6 ? mag * 2 : mag * 3.5;

    return (
      <CircleMarker
        key={eq.id}
        center={[lat, lng]}
        radius={size}
        pathOptions={{ color, fillColor: color, fillOpacity: 0.82 }}
      >
        <Popup>
          <strong>{place}</strong><br />
          Magnitude: {mag}<br />
          Depth: {depth} km<br />
          Time: {new Date(eq.properties.time).toLocaleString()}
        </Popup>
      </CircleMarker>
    );
  });
}
