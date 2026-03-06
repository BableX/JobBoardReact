const categories = ["All", "Frontend", "Backend", "Design", "Marketing"];

function JobFilter({ search, setSearch, category, setCategory }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Издөө */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Вакансия издөө..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 5,
            border: "1px solid #ccc",
            fontSize: 16
          }}
        />
      </div>
      
      {/* Категория фильтр */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "none",
              backgroundColor: category === cat ? "#007bff" : "#f0f0f0",
              color: category === cat ? "white" : "#333",
              cursor: "pointer",
              fontWeight: category === cat ? "bold" : "normal",
              transition: "all 0.3s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default JobFilter;