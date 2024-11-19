import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../css/AppointmentCreate.css';
import NavBar from "../component/NavBar";
import { createAppointment } from "../services/AppointmentServices";
import { getCampaignById } from "../services/CampignService";
import Footer1 from "../component/Footer";

export default function AppointmentCreate() {
  const { campaignId } = useParams();
  const [donorId, setDonorId] = useState('');
  const [location, setLocation] = useState('');
  const [scheduledDate, setDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [errors, setErrors] = useState({
    donorId: '',
    location: '',
    scheduledDate: '',
    termsAccepted: '',
  });

  useEffect(() => {
    if (campaignId) {
      getCampaignById(campaignId)
        .then(response => {
          setLocation(response.data.location);
        })
        .catch(error => {
          console.error("Failed to fetch campaign details:", error);
        });
    }
  }, [campaignId]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!donorId) {
      newErrors.donorId = 'Donor ID is required';
      isValid = false;
    }
    if (!location) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    if (!scheduledDate) {
      newErrors.scheduledDate = 'Date is required';
      isValid = false;
    }
    if (!termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const appointmentDetails = {
        donor: {
          donorId: donorId,
        },
        location: location,
        scheduledDate: scheduledDate + 'T14:00:00Z',
        termsAccepted: termsAccepted,
      };

      createAppointment(appointmentDetails)
        .then(() => {
          setSuccessMessage("Appointment created successfully!");
          // Clear form fields
          setDonorId('');
          setDate('');
          setTermsAccepted(false);
          setTimeout(() => setSuccessMessage(''), 3000); // Hide the message after 3 seconds
        })
        .catch(error => {
          console.error("Failed to create appointment:", error);
        });
    }
  };

  return (
    <div>
      <NavBar />
      {successMessage && (
        <div className="success-modal">
          <div className="modal-content">
            <h2>{successMessage}</h2>
            <button
              className="close-button"
              onClick={() => setSuccessMessage('')}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="center-container5">
        <div className="container1">
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="donor_id" className="block mb-2 text-lg font-medium text-left text-white">Donor ID</label>
                <input
                  type="text"
                  id="donor_id"
                  className="input-field"
                  placeholder="Enter Donor ID"
                  value={donorId}
                  onChange={(e) => setDonorId(e.target.value)}
                  required
                />
                {errors.donorId && <div className="text-red-500">{errors.donorId}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="location" className="block mb-2 text-lg font-medium text-left text-white">Location</label>
                <input
                  type="text"
                  id="location"
                  className="input-field"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  readOnly
                />
                {errors.location && <div className="text-red-500">{errors.location}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="date" className="block mb-2 text-lg font-medium text-left text-white">Date</label>
                <input
                  type="date"
                  id="date"
                  className="input-field"
                  value={scheduledDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                {errors.scheduledDate && <div className="text-red-500">{errors.scheduledDate}</div>}
              </div>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-lg font-medium text-left text-white dark:text-gray-300">
                I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
              </label>
              {errors.termsAccepted && <div className="text-red-500">{errors.termsAccepted}</div>}
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
