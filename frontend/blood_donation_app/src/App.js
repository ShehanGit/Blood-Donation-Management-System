import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import DonerRegister from './pages/DonerRegister';
import Home from './pages/Home';
import AppointmentCreate from './pages/AppointmentCreate';
import AdminDashboard from './pages/AdminDashboard';
import DonerList from './pages/adminpages/DonerList';
import ApoinmentList from './pages/adminpages/ApointmentList';
import Recipients from './pages/adminpages/RecipientsList';
import AddRecipients from './pages/adminpages/AddRecipients';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<DonerRegister />} />
          <Route exact path="/appointment" element={<AppointmentCreate />} />
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          <Route exact path="/donerlist" element={<DonerList />} />
          <Route exact path="/apoinmentlist" element={<ApoinmentList />} />
          <Route exact path="/Recipients" element={<Recipients />} />
          <Route exact path="/addrecipients" element={<AddRecipients />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;

