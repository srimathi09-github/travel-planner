import { useState } from "react";

import Navbar from "../components/Navbar";
import CreateTripForm from "../components/CreateTripForm";
import BudgetCard from "../components/BudgetCard";
import ItineraryCard from "../components/ItineraryCard";
import PackingList from "../components/PackingList";
import HotelCard from "../components/HotelCard";

function Dashboard() {
  const [trip, setTrip] = useState(null);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        <CreateTripForm onTripCreated={setTrip} />

        {trip && (
          <>
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <BudgetCard budget={trip.estimatedBudget} />

              <PackingList
                packingList={trip.packingList}
              />

              <HotelCard hotels={trip.hotels} />

              <ItineraryCard
                itinerary={trip.itinerary}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;