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
        <h2 style={{ 
          borderBottom: "2px solid #007bff", 
          paddingBottom: 10,
          marginBottom: 20,
          color: "#333"
        }}>
          Активдүү вакансиялар ({filteredJobs.length})
        </h2>
        
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