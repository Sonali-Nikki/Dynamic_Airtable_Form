// client/src/components/FormField.jsx
import React from 'react';

/*
  Props:
    - field: { id, name, type, options }  // type: short_text, long_text, single_select, multi_select, attachment
    - value
    - onChange(fieldId, newValue)
*/
export default function FormField({ field, value, onChange }) {
  const { id, name, type, options = [] } = field;

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(id, val);
  };

  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
    onChange(id, selected);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    // For now we return the File object to the parent; upload handled separately
    onChange(id, file);
  };

  switch (type) {
    case 'long_text':
      return (
        <div className="mb-3">
          <label className="block font-medium mb-1">{name}</label>
          <textarea
            value={value || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>
      );

    case 'single_select':
      return (
        <div className="mb-3">
          <label className="block font-medium mb-1">{name}</label>
          <select value={value || ''} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">-- select --</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      );

    case 'multi_select':
      return (
        <div className="mb-3">
          <label className="block font-medium mb-1">{name}</label>
          <select multiple value={value || []} onChange={handleMultiSelect} className="border p-2 rounded w-full">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      );

    case 'attachment':
      return (
        <div className="mb-3">
          <label className="block font-medium mb-1">{name}</label>
          <input type="file" onChange={handleFile} />
          {value && typeof value === 'string' && (
            <div className="text-sm text-blue-600 mt-1"><a href={value} target="_blank" rel="noreferrer">Existing file</a></div>
          )}
        </div>
      );

    case 'short_text':
    default:
      return (
        <div className="mb-3">
          <label className="block font-medium mb-1">{name}</label>
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      );
  }
}
