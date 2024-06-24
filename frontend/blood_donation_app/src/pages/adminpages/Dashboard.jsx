import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Bar, Line } from "react-chartjs-2";
import { Button } from "flowbite-react";

import { Chart, registerables } from 'chart.js';
import { getDonationList, getAppointmentStats } from "../../services/DonationServices";
import "../../css/Dashboard.css";

// Register Chart.js components
Chart.register(...registerables);

export default function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [donationsToday, setDonationsToday] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const response = await getDonationList();
        if (response.status === 200) {
          setDonations(response.data);
        } else {
          console.error("Error fetching donation details", response.status);
        }
      } catch (error) {
        console.error("Error fetching donation details:", error);
      }
    };

    const fetchAppointmentStats = async () => {
      try {
        const response = await getAppointmentStats();
        if (response.status === 200) {
          const { totalAppointments, donationsToday, upcomingAppointments } = response.data;
          setTotalAppointments(totalAppointments);
          setDonationsToday(donationsToday);
          setUpcomingAppointments(upcomingAppointments);
        } else {
          console.error("Error fetching appointment stats", response.status);
        }
      } catch (error) {
        console.error("Error fetching appointment stats:", error);
      }
    };

    fetchDonationDetails();
    fetchAppointmentStats();
  }, []);

  const handleAddDonation = () => {
    navigate('/AddDonation');
  };

  const bloodTypeData = donations.reduce((acc, donation) => {
    acc[donation.bloodType] = (acc[donation.bloodType] || 0) + donation.volumeDonated;
    return acc;
  }, {});

  const monthlyData = donations.reduce((acc, donation) => {
    const month = new Date(donation.dateOfDonation).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + donation.volumeDonated;
    return acc;
  }, {});

  // Sort monthly data keys in chronological order
  const sortedMonthlyKeys = Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b));

  const barChartData = {
    labels: Object.keys(bloodTypeData),
    datasets: [
      {
        label: 'Volume Donated (ml)',
        data: Object.values(bloodTypeData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(199, 199, 199, 0.2)',
          'rgba(83, 102, 102, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 102, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: sortedMonthlyKeys,
    datasets: [
      {
        label: 'Monthly Donations (ml)',
        data: sortedMonthlyKeys.map(key => monthlyData[key]),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4, // Add this for rounded lines
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} />
        <div className="center-container2">
          <h1 className="chart-heading">Blood Donation Overview</h1>
          <div className="counters">
            <div className="counter-card">
              <div className="counter-card-icon">📅</div>
              <h2>Total Appointments</h2>
              <p>{totalAppointments}</p>
            </div>
            <div className="counter-card">
              <div className="counter-card-icon">🩸</div>
              <h2>Donations Today</h2>
              <p>{donationsToday}</p>
            </div>
            <div className="counter-card">
              <div className="counter-card-icon">📆</div>
              <h2>Upcoming Appointments</h2>
              <p>{upcomingAppointments}</p>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={barChartData} options={chartOptions} />
          </div>
          <div className="chart-container">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
