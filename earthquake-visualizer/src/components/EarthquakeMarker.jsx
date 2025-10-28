import { CircleMarker, Popup } from "react-leaflet";
import { getMarkerStyle } from "../utils/getMarkerColor";

export default function EarthquakeMarker({ eq }) {
  const [lon, lat, depth] = eq.geometry.coordinates;
  const { mag, place, time, url } = eq.properties;
  const { color, size } = getMarkerStyle(mag);

  return (
    <CircleMarker
      center={[lat, lon]}
      radius={size}
      color={color}
      fillColor={color}
      fillOpacity={0.6}
      stroke={false}
    >
      <Popup>
        <strong>{place}</strong>
        <br />
        Magnitude: {mag}
        <br />
        Depth: {depth} km
        <br />
        Time: {new Date(time).toLocaleString()}
        <br />
        <a href={url} target="_blank" rel="noreferrer" style={{ color: "blue" }}>
          More Info
        </a>
      </Popup>
    </CircleMarker>
  );
}
