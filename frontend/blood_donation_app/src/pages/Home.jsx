import React from "react";
import '../css/Home.css';
import NavBar from '../component/NavBar';
import { useNavigate } from 'react-router-dom';
import heroImage from '../Images/heroImage2.jpg';
import { Flowbite } from "flowbite-react";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/appointment'); 
  };

  return (
    <Flowbite>
      <div>
        <NavBar />
        <div className="hero-section">
          <div className="hero-content">
            <h1>Your Blood Can Save Lives</h1>
            <p>Every drop counts. Make a difference today.</p>
            <button onClick={handleButtonClick} className="cta-button">
              Donate Now
            </button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Hero" />
          </div>
        </div>
        <div className="info-cards">
          <div className="info-card">
            <div className="icon">💧</div>
            <h3>Make an appointment</h3>
            <p>Enter your zip code to find the nearest donation center or blood drive near you.</p>
            <button onClick={() => navigate('/appointment')}>Donate</button>
          </div>
          <div className="info-card">
            <div className="icon">🩸</div>
            <h3>Learn about donating blood</h3>
            <p>Learn about every step in our simple blood donation process and what to expect.</p>
            <button onClick={() => navigate('/learn-more')}>Learn More</button>
          </div>
          <div className="info-card">
            <div className="icon">📅</div>
            <h3>Are you eligible?</h3>
            <p>Donating blood is safe and easy to do. Find out the general eligibility criteria.</p>
            <button onClick={() => navigate('/eligibility')}>Eligibility</button>
          </div>
        </div>
      </div>
    </Flowbite>
  );
}
