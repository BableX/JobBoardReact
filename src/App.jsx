import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './api/firebaseConfig';
import JobForm from './components/JobForm';
import { deleteJob } from './api/services'; 

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
   
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Управление вакансиями</h1>
      

      <JobForm />
      
      <hr style={{ margin: '20px 0' }} />
      
      <h2>Активные вакансии ({jobs.length})</h2>
      
      <div>
        {jobs.map(job => (
          <div key={job.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px', 
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9f9f9'
          }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{job.title}</h4>
              <p style={{ margin: 0, color: '#666' }}>{job.company}</p>
            </div>
            
            <button 
              onClick={() => {
                if(window.confirm("Удалить эту вакансию?")) {
                  deleteJob(job.id);
                }
              }} 
              style={{ 
                backgroundColor: '#ff4d4d', 
                color: 'white', 
                border: 'none', 
                padding: '8px 12px', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;