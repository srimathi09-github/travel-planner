function HotelCard({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h2>🏨 Recommended Hotels</h2>

      <div className="hotel-grid">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="hotel-item"
          >
            <h3>{hotel.name}</h3>

            <p>
              <strong>Tier:</strong>{" "}
              {hotel.tier}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              ⭐ {hotel.rating}
            </p>

            <p>
              <strong>Cost/Night:</strong>{" "}
              ${hotel.estimatedCostNight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelCard;