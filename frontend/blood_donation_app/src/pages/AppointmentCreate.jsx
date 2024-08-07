import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../css/AppointmentCreate.css';
import NavBar from "../component/NavBar";
import { createAppointment } from "../services/AppointmentServices";
import { getCampaignById } from "../services/CampignService"; // Import the service
import Footer1 from "../component/Footer";


export default function AppointmentCreate() {
  const { campaignId } = useParams(); // Extract the campaignId from the URL
  const [donorId, setDonorId] = useState('');
  const [location, setLocation] = useState(''); // This will be set by useEffect
  const [scheduledDate, setDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    donorId: '',
    location: '',
    scheduledDate: '',
    termsAccepted: '',
  });

  // Fetch campaign details when component mounts
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
          donorId: 3 
        },
        location: location,
        scheduledDate: scheduledDate + 'T14:00:00Z',
        termsAccepted: termsAccepted
      };

      console.log("Submitting:", appointmentDetails); // Debugging line
      createAppointment(appointmentDetails)
        .then(response => {
          console.log("Appointment created successfully:", response);
          // Redirect or display a success message here
        })
        .catch(error => {
          console.error("Failed to create appointment:", error);
          // Display error messages here
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center-container5">
        <div className="container1">
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="donor_id" className="block mb-2 text-lg font-medium text-left text-white">Donor ID</label>
                <input
                  type="text"
                  id="donor_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Donation Center Name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  readOnly // Make the location input read-only as it is fetched from the campaign
                />
                {errors.location && <div className="text-red-500">{errors.location}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="date" className="block mb-2 text-lg font-medium text-left text-white">Date</label>
                <input
                  type="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-lg font-medium text-left text-white dark:text-gray-300">
                I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.
              </label>
              {errors.termsAccepted && <div className="text-red-500">{errors.termsAccepted}</div>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer1/>
    </div>
  );
}
