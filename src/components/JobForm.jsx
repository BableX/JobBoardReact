import { useState } from 'react';
import { createJob } from '../api/services'; 

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !company) return alert("Заполни поля!");
    

    await createJob(title, company, "Описание", "Frontend");
    
    setTitle(''); 
    setCompany('');
    alert("Улетело в Firebase!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px', display: 'flex', gap: '10px' }}>
      <input 
        placeholder="Название вакансии" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        placeholder="Компания" 
        value={company} 
        onChange={(e) => setCompany(e.target.value)} 
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default JobForm;