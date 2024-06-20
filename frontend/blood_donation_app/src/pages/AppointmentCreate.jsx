import React, { useState } from "react";
import '../css/AppointmentCreate.css';
import NavBar from "../component/NavBar";
import { createAppointment } from "../services/AppointmentServices"; // Make sure you have this service

export default function AppointmentCreate() {
  const [donorId, setDonorId] = useState('');
  const [location, setLocation] = useState('');
  const [scheduledDate, setDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    donorId: '',
    location: '',
    scheduledDate: '',
    termsAccepted: '',
  });

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
        scheduledDate: scheduledDate,
      };
      console.log(appointmentDetails);
      // Proceed with form submission (e.g., API call)

      createAppointment(appointmentDetails).then((Response) => {
        console.log(Response.scheduledDate);
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center-container2">
        <div className="container1">
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="donor_id" className="block mb-2 text-lg font-medium text-left text-white">Donor ID</label>
                <input
                  type="text"
                  id="donor_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="D12345"
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
                />
                {errors.location && <div className="text-red-500">{errors.location}</div>}
              </div>
              <div>
                <label htmlFor="date" className="block mb-2 text-lg font-medium text-left text-white">Date</label>
                <input
                  type="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={scheduledDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                {errors.date && <div className="text-red-500">{errors.date}</div>}
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
    </div>
  );
}
