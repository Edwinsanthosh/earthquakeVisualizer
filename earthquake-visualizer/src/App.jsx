import { EarthquakeProvider } from "./context/EarthquakeContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <EarthquakeProvider>
      <Home />
    </EarthquakeProvider>
  );
}
