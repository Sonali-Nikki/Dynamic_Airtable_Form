// client/src/components/ConditionalLogic.jsx
import React from 'react';

/*
  Props:
    - fields: array of available field descriptors [{ id, name }]
    - rule: { fieldId, operator, value }
    - onChange(newRule)
*/
const operators = [
  { value: 'equals', label: 'equals' },
  { value: 'not_equals', label: 'not equals' },
  { value: 'contains', label: 'contains' },
  { value: 'not_contains', label: 'not contains' }
];

export default function ConditionalLogic({ fields = [], rule = {}, onChange }) {
  const set = (patch) => onChange({ ...rule, ...patch });

  return (
    <div className="border p-3 rounded mb-3">
      <div className="mb-2 font-semibold">Conditional Logic</div>

      <div className="mb-2">
        <label className="block text-sm">When field</label>
        <select
          value={rule.fieldId || ''}
          onChange={(e) => set({ fieldId: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">-- select field --</option>
          {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm">Operator</label>
        <select
          value={rule.operator || operators[0].value}
          onChange={(e) => set({ operator: e.target.value })}
          className="border p-2 rounded w-full"
        >
          {operators.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm">Value</label>
        <input
          value={rule.value || ''}
          onChange={(e) => set({ value: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
}
