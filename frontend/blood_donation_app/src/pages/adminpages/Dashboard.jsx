import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { getDonationList, getAppointmentStats } from "../../services/DonationServices";
import { getRecipientList } from "../../services/ResipientService"; // Import the recipient service
import "../../css/Dashboard.css";
import Footer1 from "../../component/Footer";

// Register Chart.js components
Chart.register(...registerables);

export default function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [recipients, setRecipients] = useState([]);
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

    const fetchRecipientList = async () => {
      try {
        const response = await getRecipientList();
        if (response.status === 200) {
          setRecipients(response.data);
        } else {
          console.error("Error fetching recipient details", response.status);
        }
      } catch (error) {
        console.error("Error fetching recipient details:", error);
      }
    };

    fetchDonationDetails();
    fetchAppointmentStats();
    fetchRecipientList(); // Fetch the recipient data
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

  const requiredMonthlyData = recipients.reduce((acc, recipient) => {
    const month = new Date(recipient.receivingDate).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + recipient.requiredBloodVolume;
    return acc;
  }, {});

  // Combine the two datasets
  const allMonths = [...new Set([...Object.keys(monthlyData), ...Object.keys(requiredMonthlyData)])];

  const sortedMonthlyKeys = allMonths.sort((a, b) => {
    const [aMonth, aYear] = a.split(' ');
    const [bMonth, bYear] = b.split(' ');
    const aDate = new Date(`${aYear}-${aMonth}-01`);
    const bDate = new Date(`${bYear}-${bMonth}-01`);
    return aDate - bDate;
  });

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
        data: sortedMonthlyKeys.map(key => monthlyData[key] || 0),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4, // Add this for rounded lines
      },
      {
        label: 'Monthly Required Volume (ml)',
        data: sortedMonthlyKeys.map(key => requiredMonthlyData[key] || 0),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        tension: 0.4, // Add this for rounded lines
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Volume (ml)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    },
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} />
        <div className="center-container9">
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
          <div className="charts-wrapper">
            <div className="chart-container">
              <Bar data={barChartData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
      <Footer1/>
    </div>
  );
}
