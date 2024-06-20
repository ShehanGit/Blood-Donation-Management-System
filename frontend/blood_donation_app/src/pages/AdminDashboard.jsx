import React, { useState } from "react";
import '../css/AppointmentCreate.css';
import NavBar from "../component/NavBar";
import Sidebar from "../component/Sidebar";

import { createAppointment } from "../services/AppointmentServices"; 

export default function AdminDashboard() {
 


  return (
    <div>
      <NavBar />
      <Sidebar />
    </div>
  );

};