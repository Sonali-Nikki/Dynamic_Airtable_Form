import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const FormBuilder = () => {
  const [bases, setBases] = useState([]);
  const [tables, setTables] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    API.get('/airtable/bases')
      .then(res => setBases(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBaseSelect = (baseId) => {
    setSelectedBase(baseId);
    setTables([]);
    setFields([]);
    setSelectedTable('');
    setSelectedFields([]);
    API.get(`/airtable/tables/${baseId}`)
      .then(res => setTables(res.data))
      .catch(err => console.error(err));
  };

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
    setFields([]);
    setSelectedFields([]);
    API.get(`/airtable/fields/${tableId}`)
      .then(res => setFields(res.data))
      .catch(err => console.error(err));
  };

  const toggleFieldSelection = (fieldId) => {
    setSelectedFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const saveForm = () => {
    API.post('/forms', {
      baseId: selectedBase,
      tableId: selectedTable,
      fields: selectedFields
    })
      .then(res => navigate(`/form/${res.data._id}`))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Form Builder</h1>
      <div>
        <label>Select Base:</label>
        <select onChange={(e) => handleBaseSelect(e.target.value)} value={selectedBase}>
          <option value="">-- Select Base --</option>
          {bases.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {tables.length > 0 && (
        <div>
          <label>Select Table:</label>
          <select onChange={(e) => handleTableSelect(e.target.value)} value={selectedTable}>
            <option value="">-- Select Table --</option>
            {tables.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      )}

      {fields.length > 0 && (
        <div>
          <h3>Select Fields:</h3>
          {fields.map(f => (
            <div key={f.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFields.includes(f.id)}
                  onChange={() => toggleFieldSelection(f.id)}
                />
                {f.name}
              </label>
            </div>
          ))}
        </div>
      )}

      {selectedFields.length > 0 && (
        <button onClick={saveForm}>Save Form</button>
      )}
    </div>
  );
};

export default FormBuilder;
