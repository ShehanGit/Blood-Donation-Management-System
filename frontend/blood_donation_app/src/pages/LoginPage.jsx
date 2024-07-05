import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import NavBar from '../component/NavBar';  // Ensure this import path matches your project structure
import '../css/LoginPage.css';  // Make sure the CSS file is correctly located and imported

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard'); // Adjust this to where you want to navigate after login
  };

  return (
    <div>
        <NavBar/>
        <div className="formContainer">
          <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
            <div className="mb-2 block">
              <Label htmlFor="name1" value="Your name" />
              <TextInput id="name1" type="text" placeholder="Enter your name" required /> 
            </div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
              <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
    </div>
  );
};

export default LoginPage;
