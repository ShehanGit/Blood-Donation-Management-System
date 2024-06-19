import React from "react";
import '../css/Home.css';

import NavBar from '../component/NavBar';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const navigate = useNavigate();

        const handleButtonClick = () => {
        navigate('/appointment'); // Navigates to the "/register" page
      };

  return (
    <div>
            <NavBar/>
            <div className="flex justify-start">
                <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-9 rounded ml-10">
                    appointment
                </button>
    </div>
    </div>
  );
}
