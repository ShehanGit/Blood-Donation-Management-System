import React from 'react';
import { Button, Navbar, DarkThemeToggle, useThemeMode } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import logo from '../Images/Logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const { toggleMode } = useThemeMode();

  const handleButtonClick = () => {
    navigate('/dashboard'); // Navigates to the "/dashboard" page
  };

  const handleButtonClick1 = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand onClick={handleButtonClick1}>
          <img src={logo} className="mr-3 h-6 sm:h-28" alt="Flowbite React Logo" />
          <span onClick={handleButtonClick1} className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">BloodFlow</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <DarkThemeToggle onClick={toggleMode} className="mr-2" />
          <Button onClick={handleButtonClick} style={{ width: '150px' }}>Sign In</Button>
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
