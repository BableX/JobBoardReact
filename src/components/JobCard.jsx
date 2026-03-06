import { deleteJob } from "../api/services";

function JobCard({ job, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm(`"${job.title}" вакансиясын өчүрүүнү каалайсызбы?`)) {
      const result = await deleteJob(job.id);
      if (result.success) {
        // onDelete опционалдуу, бирок керек болсо колдонсо болот
      } else {
        alert("Өчүрүүдө ката кетти");
      }
    }
  };

  // Датаны форматтоо
  const formatDate = (timestamp) => {
    if (!timestamp) return "Көрсөтүлгөн эмес";
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ky-KG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 20,
      marginBottom: 15,
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{job.title}</h3>
          
          <p style={{ margin: "5px 0", color: "#666" }}>
            <strong>Компания:</strong> {job.company}
          </p>
          
          <p style={{ margin: "5px 0", color: "#666" }}>
            <strong>Категория:</strong> 
            <span style={{
              backgroundColor: "#e7f3ff",
              padding: "3px 8px",
              borderRadius: 12,
              marginLeft: 8,
              fontSize: 14
            }}>
              {job.category}
            </span>
          </p>
          
          <p style={{ margin: "10px 0", color: "#555", lineHeight: 1.5 }}>
            {job.description}
          </p>
          
          <p style={{ margin: "5px 0", color: "#999", fontSize: 14 }}>
            <strong>Кошулган:</strong> {formatDate(job.createdAt)}
          </p>
        </div>
        
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
            marginLeft: 20,
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#ff3333"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#ff4d4d"}
        >
          Өчүрүү
        </button>
      </div>
    </div>
  );
}

export default JobCard;