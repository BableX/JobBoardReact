import { useState } from "react";
import { addJob } from "../api/services";

const categories = ["Frontend", "Backend", "Design", "Marketing"];

function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    category: categories[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Валидация
    if (!formData.title.trim() || !formData.company.trim() || !formData.description.trim()) {
      setError("Бардык талааларды толтуруңуз");
      setLoading(false);
      return;
    }

    const result = await addJob(formData);
    
    if (result.success) {
      // Форманы тазалоо
      setFormData({
        title: "",
        company: "",
        description: "",
        category: categories[0]
      });
    } else {
      setError("Вакансия кошулган жок. Кайра аракет кылыңыз.");
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 30, padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>Жаңы вакансия кошуу</h3>
      
      {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}
      
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          name="title"
          placeholder="Вакансия аталышы"
          value={formData.title}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          disabled={loading}
        />
      </div>
      
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          name="company"
          placeholder="Компания"
          value={formData.company}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          disabled={loading}
        />
      </div>
      
      <div style={{ marginBottom: 15 }}>
        <textarea
          name="description"
          placeholder="Сүрөттөмө"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #ccc", resize: "vertical" }}
          disabled={loading}
        />
      </div>
      
      <div style={{ marginBottom: 15 }}>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          disabled={loading}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: 5,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          width: "100%",
          fontSize: 16
        }}
      >
        {loading ? "Кошулууда..." : "Кошуу"}
      </button>
    </form>
  );
}

export default JobForm;