import React from 'react';
import NavBar from './NavBar';
import FooterComponent from './FooterComponent'; // Correctly import the FooterComponent

const SimpleComponent = () => {
  return (
    <div>
      <NavBar />
      <h1>Hello</h1>
      <FooterComponent /> 
      
    </div>
  );
};

export default SimpleComponent;
