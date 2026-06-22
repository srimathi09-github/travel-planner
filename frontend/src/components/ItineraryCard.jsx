function ItineraryCard({
  itinerary,
}) {
  if (!itinerary?.length)
    return null;

  return (
    <div className="card">
      <h2>Itinerary</h2>

      {itinerary.map((day) => (
        <div
          key={day.dayNumber}
          style={{
            marginBottom: "25px",
          }}
        >
          <h3>
            Day {day.dayNumber}
          </h3>

          {day.activities.map(
            (
              activity,
              index
            ) => (
              <div
                key={index}
                className="activity"
              >
                <h4>
                  {
                    activity.title
                  }
                </h4>

                <p>
                  {
                    activity.description
                  }
                </p>

                <small>
                  {
                    activity.timeOfDay
                  }
                </small>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default ItineraryCard;