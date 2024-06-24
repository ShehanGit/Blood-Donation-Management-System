import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import NavBar from "../component/NavBar";
import { getCampaignList } from '../services/CampignService'; // Adjust the import path as necessary

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MyComponent({ googleMapsApiKey }) {
  const [campaigns, setCampaigns] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate(); // Using useNavigate here

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
      },
      () => {
        alert('Location access denied. Defaulting to a central location.');
        setCurrentLocation({ lat: 40.712776, lng: -74.005974 }); // Default location
      }
    );

    const fetchCampaigns = async () => {
      const response = await getCampaignList();
      setCampaigns(response.data);
    };

    fetchCampaigns();
  }, []);

  const handleMarkerClick = (campaignId) => {
    // Navigate to the appointment page with the campaignId
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
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Blue icon for current location
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
    </LoadScript>
  );
}

export default React.memo(MyComponent);
