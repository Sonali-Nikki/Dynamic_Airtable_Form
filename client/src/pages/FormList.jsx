import React, { useEffect, useState } from 'react';
import { getForms } from '../api/api';
import { Link } from 'react-router-dom';

export default function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getForms().then(setForms).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Forms</h1>
      <ul className="space-y-3">
        {forms.map((form) => (
          <li key={form._id} className="p-4 border rounded-lg shadow">
            <h3 className="font-bold">{form.title}</h3>
            <Link
              to={`/form/${form._id}`}
              className="text-blue-500 underline text-sm"
            >
              Fill Form
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
