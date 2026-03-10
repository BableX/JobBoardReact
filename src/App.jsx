import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./api/firebaseConfig";
import JobForm from "./components/JobForm";
import JobFilter from "./components/JobFilter";
import JobList from "./components/JobList";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firestore дан маалымат алуу (реалдуу убакытта)
  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const jobsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(jobsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Маалымат алууда ката:", err);
        setError("Маалыматтарды жүктөөдө ката кетти");
        setLoading(false);
      }
    );

    // Cleanup функциясы
    return () => unsubscribe();
  }, []);

  // Фильтрленген вакансиялар
  const filteredJobs = jobs.filter(job => {
    // Издөө боюнча фильтр
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    
    // Категория боюнча фильтр
    const matchesCategory = category === "All" || job.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const activeRatio = jobs.length
    ? Math.round((filteredJobs.length / jobs.length) * 100)
    : 0;

  return (
    <div style={{
      maxWidth: 800,
      margin: "0 auto",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: 30 }}>
        💼 Вакансиялар тактасы
      </h1>

      <JobForm />
      
      <JobFilter 
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div style={{ marginTop: 30 }}>
        <div style={{
          marginBottom: 20,
          padding: "18px 18px 16px",
          borderRadius: 16,
          border: "1px solid #cfe2ff",
          borderLeft: "7px solid #007bff",
          background: "linear-gradient(135deg, #f6faff 0%, #e8f2ff 55%, #f9fcff 100%)",
          boxShadow: "0 10px 24px rgba(0, 86, 179, 0.12)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12
          }}>
            <div>
              <h2 style={{
                margin: 0,
                color: "#1c2f44",
                fontSize: 24,
                lineHeight: 1.2
              }}>
                Активдүү вакансиялар
              </h2>
              <p style={{
                margin: "7px 0 0",
                color: "#45617f",
                fontSize: 14
              }}>
                Азыр көрүнүп турган позициялар: {filteredJobs.length}
              </p>
            </div>

            <div style={{
              minWidth: 64,
              padding: "8px 14px",
              borderRadius: 999,
              background: "linear-gradient(90deg, #007bff 0%, #0056d6 100%)",
              color: "#ffffff",
              textAlign: "center",
              fontSize: 24,
              fontWeight: 800,
              lineHeight: 1,
              boxShadow: "0 8px 16px rgba(0, 86, 214, 0.25)"
            }}>
              {filteredJobs.length}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: "#35506d",
              marginBottom: 6
            }}>
              <span>Фильтрдин натыйжалуулугу</span>
              <span>{activeRatio}%</span>
            </div>
            <div style={{
              height: 8,
              borderRadius: 999,
              backgroundColor: "#d9e9ff",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${activeRatio}%`,
                height: "100%",
                background: "linear-gradient(90deg, #1a8cff 0%, #0056d6 100%)",
                borderRadius: 999,
                transition: "width 0.3s ease"
              }} />
            </div>
          </div>
        </div>
        
        <JobList 
          jobs={filteredJobs}
          loading={loading}
          error={error}
        />
      </div>

      {/* Стильдер */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
