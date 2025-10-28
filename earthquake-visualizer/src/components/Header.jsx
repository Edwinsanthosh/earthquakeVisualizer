export default function Header() {
  return (
    <header
      style={{
        padding: "16px 24px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#f1f5f9" }}>
        🌍 Earthquake Visualizer
      </h1>
    </header>
  );
}
