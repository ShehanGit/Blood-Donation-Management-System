import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom'; // Use navigate instead of useHistory
import NavBar from "../component/NavBar";
import Footer1 from "../component/Footer";
import { getCampaignList } from '../services/CampignService'; // Adjust the import path as necessary

const containerStyle = {
  width: '90%',
  height: '500px',
  borderRadius: '20px', // Adds rounded corners to the map
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)', // Adds shadow for depth perception
  border: '1px solid #ccc', // Adds a border around the map
   marginLeft: '70px',
   marginTop: '20px',
   marginBottom: '50px'

  

};

function MyComponent({ googleMapsApiKey }) {
  const [campaigns, setCampaigns] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate(); // Use navigate hook for navigation

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
      },
      () => {
        alert('Location access denied. Defaulting to a central location.');
        setCurrentLocation({ lat: 40.712776, lng: -74.005974 }); // Default location if access denied
      }
    );

    // Fetch campaigns from your backend
    const fetchCampaigns = async () => {
      const response = await getCampaignList();
      setCampaigns(response.data);
    };

    fetchCampaigns();
  }, []);

  const handleMarkerClick = (campaignId) => {
    // Navigate to the appointment page when a marker is clicked
    navigate(`/appointment/${campaignId}`);
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <NavBar />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || { lat: 40.712776, lng: -74.005974 }}
        zoom={12}
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Icon for the current location
            }}
          />
        )}
        {campaigns.map(campaign => (
          <Marker
            key={campaign.campaignId}
            position={{ lat: campaign.latitude, lng: campaign.longitude }}
            onClick={() => handleMarkerClick(campaign.campaignId)}
          />
        ))}
      </GoogleMap>
      <Footer1/>
    </LoadScript>
    
  );
}

export default React.memo(MyComponent);
