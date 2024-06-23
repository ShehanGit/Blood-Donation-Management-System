import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Bar } from "react-chartjs-2";
import { Button } from "flowbite-react";

import { Chart, registerables } from 'chart.js';
import { getDonationList } from "../../services/DonationServices"; // Assuming you have these service functions
import "../../css/Dashboard.css"; // Make sure to create this CSS file for custom styles

// Register Chart.js components
Chart.register(...registerables);

export default function Dashboard() {
  const [donations, setDonations] = useState([]);
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

    fetchDonationDetails();
  }, []);

  const handleAddDonation = () => {
    navigate(`/AddDonation`);
  };

  const bloodTypeData = donations.reduce((acc, donation) => {
    acc[donation.bloodType] = (acc[donation.bloodType] || 0) + donation.volumeDonated;
    return acc;
  }, {});

  const chartData = {
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
        <div className="center-container">
          <h1 className="chart-heading">Blood Donation Overview</h1>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>

        </div>
      </div>
    </div>
  );
}
