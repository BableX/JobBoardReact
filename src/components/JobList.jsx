import JobCard from "./JobCard";

function JobList({ jobs, loading, error }) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{
          border: "3px solid #f3f3f3",
          borderTop: "3px solid #3498db",
          borderRadius: "50%",
          width: 40,
          height: 40,
          margin: "0 auto",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ marginTop: 20 }}>Жүктөлүүдө...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "red" }}>
        <p>Ката: {error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
        <p>Вакансиялар табылган жок</p>
      </div>
    );
  }

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;