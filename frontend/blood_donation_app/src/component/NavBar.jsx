import React from 'react';
import { Button, Navbar } from "flowbite-react";
import myImage from '../images/Logo.png';

const NavBar = () => {
    return (
      <div>
        <Navbar
          fluid
          rounded
          style={{ height: '80px', fontSize: '1.25rem' }}
        >
          <Navbar.Brand href="https://flowbite-react.com">
            <img
              src={myImage}
              className="mr-3"
              style={{ height: '50px' }}
              alt="Logo"
            />
            <span
              className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
              style={{ fontSize: '1.5rem' }}
            >
              Flowbite React
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Button >Get started</Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse style={{ padding: '1rem' }}>
            <Navbar.Link href="#" active style={{ fontSize: '1.25rem' }}>
              Home
            </Navbar.Link>
            <Navbar.Link href="#" style={{ fontSize: '1.25rem' }}>
              About
            </Navbar.Link>
            <Navbar.Link href="#" style={{ fontSize: '1.25rem' }}>
              Services
            </Navbar.Link>
            <Navbar.Link href="#" style={{ fontSize: '1.25rem' }}>
              Pricing
            </Navbar.Link>
            <Navbar.Link href="#" style={{ fontSize: '1.25rem' }}>
              Contact
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

export default NavBar;
