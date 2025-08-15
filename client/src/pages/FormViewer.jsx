import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useParams } from 'react-router-dom';

const FormViewer = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    API.get(`/forms/${id}`)
      .then(res => {
        setForm(res.data);
        const initialData = {};
        res.data.fields.forEach(f => {
          initialData[f.id] = '';
        });
        setFormData(initialData);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    API.post(`/forms/${id}/submit`, formData)
      .then(() => alert('Form submitted successfully!'))
      .catch(() => alert('Form submission failed.'));
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <div>
      <h1>Fill Out Form</h1>
      {form.fields.map(f => (
        <div key={f.id}>
          <label>{f.name}</label>
          <input
            type="text"
            value={formData[f.id]}
            onChange={(e) => handleChange(f.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormViewer;
