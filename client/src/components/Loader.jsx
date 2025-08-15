// client/src/components/Loader.jsx
import React from 'react';

export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600 mb-3"></div>
      <div className="text-sm text-gray-600">{message}</div>
    </div>
  );
}
