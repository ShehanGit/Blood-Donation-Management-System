import React from "react";
import '../css/Home.css';
import NavBar from '../component/NavBar';
import { useNavigate } from 'react-router-dom';
// import heroImage from '../Images/heroImage.png';
import heroImage from '../Images/heroImage2.jpg';


export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/appointment'); 
  };

  return (
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
    </div>
  );
}
