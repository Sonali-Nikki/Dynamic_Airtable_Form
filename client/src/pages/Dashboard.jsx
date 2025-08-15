import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Airtable Form Builder</h1>
      <Link to="/form-builder">
        <button>Create New Form</button>
      </Link>
    </div>
  );
};

export default Dashboard;
