import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ClientDetails from './dashboard/components/ClientDetails';
import './App.css';

function App() {
  console.log('App component rendering');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/client/:clientId" element={<ClientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
