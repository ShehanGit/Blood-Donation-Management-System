import React, { useState } from "react";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import '../../css/AddRecipient.css';
import { createDonation } from "../../services/DonationServices"; // Update the service import
import Footer1 from "../../component/Footer";

export default function AddDonation() {
  const [donorId, setDonorId] = useState('');
  const [dateOfDonation, setDateOfDonation] = useState('');
  const [location, setLocation] = useState('');
  const [volumeDonated, setVolumeDonated] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [status, setStatus] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    donorId: '',
    dateOfDonation: '',
    location: '',
    volumeDonated: '',
    bloodType: '',
    status: '',
    termsAccepted: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!donorId) {
      newErrors.donorId = "Donor ID is required";
      isValid = false;
    }
    if (!dateOfDonation) {
      newErrors.dateOfDonation = 'Date of Donation is required';
      isValid = false;
    }
    if (!location) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    if (!volumeDonated) {
      newErrors.volumeDonated = 'Volume Donated is required';
      isValid = false;
    }
    if (!bloodType) {
      newErrors.bloodType = 'Blood Type is required';
      isValid = false;
    }
    if (!status) {
      newErrors.status = 'Status is required';
      isValid = false;
    }
    if (!termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const donationDetails = {
        donor: { donorId: parseInt(donorId) },
        dateOfDonation,
        location,
        volumeDonated: parseFloat(volumeDonated),
        bloodType,
        status,
      };

      try {
        const response = await createDonation(donationDetails);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error creating the donation:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} />
        <h1>Add Donation</h1>
        <div className="center-container">
          <div className="container1">
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="donorId" className="block mb-2 text-lg font-medium text-left text-white">
                    Donor ID
                  </label>
                  <input
                    type="number"
                    id="donorId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1"
                    value={donorId}
                    onChange={(e) => setDonorId(e.target.value)}
                    required
                  />
                  {errors.donorId && <div className="text-red-500">{errors.donorId}</div>}
                </div>
                <div>
                  <label htmlFor="dateOfDonation" className="block mb-2 text-lg font-medium text-left text-white">
                    Date of Donation
                  </label>
                  <input
                    type="date"
                    id="dateOfDonation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={dateOfDonation}
                    onChange={(e) => setDateOfDonation(e.target.value)}
                    required
                  />
                  {errors.dateOfDonation && <div className="text-red-500">{errors.dateOfDonation}</div>}
                </div>
                <div>
                  <label htmlFor="location" className="block mb-2 text-lg font-medium text-left text-white">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="City Hospital 3"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  {errors.location && <div className="text-red-500">{errors.location}</div>}
                </div>
                <div>
                  <label htmlFor="volumeDonated" className="block mb-2 text-lg font-medium text-left text-white">
                    Volume Donated (ml)
                  </label>
                  <input
                    type="number"
                    id="volumeDonated"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="450"
                    value={volumeDonated}
                    onChange={(e) => setVolumeDonated(e.target.value)}
                    required
                  />
                  {errors.volumeDonated && <div className="text-red-500">{errors.volumeDonated}</div>}
                </div>
                <div>
                  <label htmlFor="bloodType" className="block mb-2 text-lg font-medium text-left text-white">
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  {errors.bloodType && <div className="text-red-500">{errors.bloodType}</div>}
                </div>
                <div>
                  <label htmlFor="status" className="block mb-2 text-lg font-medium text-left text-white">
                    Status
                  </label>
                  <select
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {errors.status && <div className="text-red-500">{errors.status}</div>}
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
<Footer1/>

    </div>
  );
}
