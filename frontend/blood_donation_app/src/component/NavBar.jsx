import React from 'react';
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from 'react-router-dom';


import logo from '../Images/Logo.png';


const NavBar = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/register'); // Navigates to the "/register" page
    };

    const handleButtonClick1 = () => {
      navigate('/'); // Navigates to the "/register" page
    };


    return (
        <div>
            <Navbar fluid rounded>
      <Navbar.Brand onClick={handleButtonClick1}>
        <img src={logo} className="mr-3 h-6 sm:h-28" alt="Flowbite React Logo" />
        <span onClick={handleButtonClick1} className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">BloodFlow</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={handleButtonClick}>Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>

        </div>
    );
};

export default NavBar;
