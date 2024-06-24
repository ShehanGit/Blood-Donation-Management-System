import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import NavBar from "../component/NavBar";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB_rQpC-DXpusJEp1PBBC5RzgmOFvpUCzk" // Replace YOUR_API_KEY with the key you generated
    >

        <NavBar />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Child components like markers or info windows here */}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent);
