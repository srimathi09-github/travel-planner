function PackingList({
  packingList,
  togglePacked
}) {
  return (
    <div className="card">
      <h2>Packing List</h2>

      {packingList?.map((item) => (
        <div
          key={item._id}
          className="packing-item"
        >
          <input
            type="checkbox"
            checked={item.isPacked}
            onChange={() =>
              togglePacked(item._id)
            }
          />

          <span>
            {item.item}
          </span>

          <small>
            {item.category}
          </small>
        </div>
      ))}
    </div>
  );
}

export default PackingList;