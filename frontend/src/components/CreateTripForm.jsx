import { useState } from "react";
import API from "../services/api";

function CreateTripForm({
  onTripCreated,
}) {
  const [form, setForm] = useState({
    destination: "",
    durationDays: 3,
    budgetTier: "Medium",
    interests: "",
  });

  const [loading, setLoading] =
    useState(false);

  const submitTrip = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post(
        "/trips/generate",
        {
          destination:
            form.destination,
          durationDays:
            Number(
              form.durationDays
            ),
          budgetTier:
            form.budgetTier,
          interests:
            form.interests
              .split(",")
              .map((i) =>
                i.trim()
              ),
        }
      );

      onTripCreated(res.data);

      setForm({
        destination: "",
        durationDays: 3,
        budgetTier: "Medium",
        interests: "",
      });
    } catch (error) {
      alert(
        "Unable to generate trip"
      );
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Create Trip</h2>

      <form onSubmit={submitTrip}>
        <input
          className="input"
          placeholder="Destination"
          value={form.destination}
          onChange={(e) =>
            setForm({
              ...form,
              destination:
                e.target.value,
            })
          }
        />

        <input
          className="input"
          type="number"
          placeholder="Days"
          value={form.durationDays}
          onChange={(e) =>
            setForm({
              ...form,
              durationDays:
                e.target.value,
            })
          }
        />

        <select
          className="input"
          value={form.budgetTier}
          onChange={(e) =>
            setForm({
              ...form,
              budgetTier:
                e.target.value,
            })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          className="input"
          placeholder="Food,Culture,Adventure"
          value={form.interests}
          onChange={(e) =>
            setForm({
              ...form,
              interests:
                e.target.value,
            })
          }
        />

        <button
          className="btn"
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Trip"}
        </button>
      </form>
    </div>
  );
}

export default CreateTripForm;