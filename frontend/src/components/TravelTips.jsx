function TravelTips({ tips }) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h2>Smart Travel Tips</h2>

      {tips.map((tip, index) => (
        <div
          key={index}
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "12px"
          }}
        >
          <h4>{tip.title}</h4>
          <p>{tip.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TravelTips;