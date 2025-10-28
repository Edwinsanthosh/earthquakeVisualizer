// src/components/Sidebar.jsx
export default function Sidebar({ earthquakes, onFilterChange }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Earthquakes Today</h2>

      {/* Filter Controls */}
      <div className="filters">
        <label>Min Magnitude:</label>
        <select onChange={(e) => onFilterChange(Number(e.target.value))}>
          <option value={0}>All</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5+</option>
        </select>
      </div>

      {/* List */}
      <ul className="quake-list">
        {earthquakes.map((eq) => (
          <li key={eq.id}>
            <strong>{eq.properties.mag}</strong> — {eq.properties.place}
          </li>
        ))}
      </ul>
    </div>
  );
}
