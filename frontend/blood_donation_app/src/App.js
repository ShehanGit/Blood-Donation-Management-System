import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import DonerRegister from './pages/DonerRegister';
import Home from './pages/Home';
import AppointmentCreate from './pages/AppointmentCreate';
import AdminDashboard from './pages/AdminDashboard';
import DonerList from './pages/adminpages/DonerList';
import ApoinmentList from './pages/adminpages/ApointmentList';
import Recipients from './pages/adminpages/RecipientsList';
import AddRecipients from './pages/adminpages/AddRecipients';
import BloodInventory from './pages/adminpages/bloodInventory';
import DonationList from './pages/adminpages/DonationList';
import AddDonation from './pages/adminpages/DonationAdd';
import HospitalList from './pages/adminpages/HospitalList';
import Dashboard from './pages/adminpages/Dashboard';
import Map from './pages/Map';
import CampignCreate from './pages/CampaignCreate';
import LoginPage from './pages/LoginPage';


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
          <Route exact path="/bloodinventory" element={<BloodInventory />} />
          <Route exact path="/donationlist" element={<DonationList />} />
          <Route exact path="/Adddonation" element={<AddDonation />} />
          <Route exact path="/hospitallist" element={<HospitalList />} />
          <Route exact path="/dashboard1" element={<Dashboard />} />
          <Route exact path="/map" element={<Map />} />
          <Route path="/appointment/:campaignId" element={<AppointmentCreate />} />
          <Route path="/campigncreate" element={<CampignCreate />} />
          <Route path="/loginpage" element={<LoginPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
