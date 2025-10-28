import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import useEarthquakeData from "../hooks/useEarthquakeData";
import getMarkerColor from "../utils/getMarkerColor";

export default function MapView({ earthquakes }) {
  const quakeData = useEarthquakeData(); // ✅ renamed
  const center = [20, 78];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={center} zoom={3} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {(earthquakes || quakeData).map((eq) => {  // ✅ chooses props first, fallback to hook
          const [longitude, latitude] = eq.geometry.coordinates;
          const magnitude = eq.properties.mag;
          const place = eq.properties.place;
          const color = getMarkerColor(magnitude);

          return (
            <CircleMarker
              key={eq.id}
              center={[latitude, longitude]}
              radius={magnitude * 2}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.7 }}
            >
              <Popup>
                <strong>{place}</strong><br />
                Magnitude: {magnitude}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
