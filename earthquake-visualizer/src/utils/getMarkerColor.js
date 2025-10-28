// src/utils/getMarkerColor.js
export default function getMarkerColor(mag) {
  if (mag >= 5) return "red";       // Major
  if (mag >= 3) return "orange";    // Moderate
  if (mag > 1) return "yellow";     // Minor
  return "green";                   // Very small / micro
}
