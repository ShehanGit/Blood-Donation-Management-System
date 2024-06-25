import React, { useState } from "react";
import '../css/DonerRegister.css';
import NavBar from "../component/NavBar";
import { createCampaign } from "../services/CampignService";
import Footer1 from "../component/Footer";



export default function CampignCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [totalDonations, setTotalDonations] = useState('');
  const [status, setStatus] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    totalDonations: '',
    status: '',
    latitude: '',
    longitude: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = "Campaign Name is required";
      isValid = false;
    }
    if (!description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!startDate) {
      newErrors.startDate = 'Start Date is required';
      isValid = false;
    }
    if (!endDate) {
      newErrors.endDate = 'End Date is required';
      isValid = false;
    }
    if (!location) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    if (!organizer) {
      newErrors.organizer = 'Organizer is required';
      isValid = false;
    }
    if (!totalDonations) {
      newErrors.totalDonations = 'Total Donations is required';
      isValid = false;
    }
    if (!status) {
      newErrors.status = 'Status is required';
      isValid = false;
    }
    if (!latitude) {
      newErrors.latitude = 'Latitude is required';
      isValid = false;
    }
    if (!longitude) {
      newErrors.longitude = 'Longitude is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const campaignDetails = {
        name,
        description,
        startDate,
        endDate,
        location,
        organizer,
        totalDonations: parseInt(totalDonations, 10),
        status,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      console.log(campaignDetails);
      // Proceed with form submission (e.g., API call)

      createCampaign(campaignDetails).then((response) => {
        console.log(response.data);
      });

    }
  };

  return (
    <div>
      <NavBar />
      <div className="center-container">
        <div className="container3">
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block mb-2 text-lg font-medium text-left text-white">Campaign Name</label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Campaign Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block mb-2 text-lg font-medium text-left text-white">Description</label>
                <textarea
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                {errors.description && <div className="text-red-500">{errors.description}</div>}
              </div>
              <div>
                <label htmlFor="startDate" className="block mb-2 text-lg font-medium text-left text-white">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                {errors.startDate && <div className="text-red-500">{errors.startDate}</div>}
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-2 text-lg font-medium text-left text-white">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
                {errors.endDate && <div className="text-red-500">{errors.endDate}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="location" className="block mb-2 text-lg font-medium text-left text-white">Location</label>
                <input
                  type="text"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                {errors.location && <div className="text-red-500">{errors.location}</div>}
              </div>
              <div>
                <label htmlFor="organizer" className="block mb-2 text-lg font-medium text-left text-white">Organizer</label>
                <input
                  type="text"
                  id="organizer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Organizer"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  required
                />
                {errors.organizer && <div className="text-red-500">{errors.organizer}</div>}
              </div>
              {/* <div>
                <label htmlFor="totalDonations" className="block mb-2 text-lg font-medium text-left text-white">Total Donations</label>
                <input
                  type="number"
                  id="totalDonations"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Total Donations"
                  value={totalDonations}
                  onChange={(e) => setTotalDonations(e.target.value)}
                  required
                />
                {errors.totalDonations && <div className="text-red-500">{errors.totalDonations}</div>}
              </div> */}
              <div>
                <label htmlFor="status" className="block mb-2 text-lg font-medium text-left text-white">Status</label>
                <select
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && <div className="text-red-500">{errors.status}</div>}
              </div>
              <div>
                <label htmlFor="latitude" className="block mb-2 text-lg font-medium text-left text-white">Latitude</label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
                {errors.latitude && <div className="text-red-500">{errors.latitude}</div>}
              </div>
              <div>
                <label htmlFor="longitude" className="block mb-2 text-lg font-medium text-left text-white">Longitude</label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
                {errors.longitude && <div className="text-red-500">{errors.longitude}</div>}
              </div>
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
