function BudgetCard({ budget }) {
  if (!budget) return null;

  return (
    <div className="card">
      <h2>Budget Summary</h2>

      <p>
        Flights: $
        {budget.flights}
      </p>

      <p>
        Accommodation: $
        {budget.accommodation}
      </p>

      <p>
        Food: ${budget.food}
      </p>

      <p>
        Activities: $
        {budget.activities}
      </p>

      <hr />

      <h3>
        Total: $
        {budget.total}
      </h3>
    </div>
  );
}

export default BudgetCard;