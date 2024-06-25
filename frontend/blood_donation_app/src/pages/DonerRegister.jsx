import React, { useState } from "react";
import '../css/DonerRegister.css';
import NavBar from "../component/NavBar";
import { createDonor } from "../services/DoneerServices";
import Footer1 from "../component/Footer";


export default function DonerRegister() {
  const [name, setDonorName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [gender, setGender] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    nicNumber: '',
    contactNumber: '',
    email: '',
    address: '',
    dateOfBirth: '',
    bloodType: '',
    gender: '',
    lastDonationDate: '',
    termsAccepted: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = "Donor's Name is required";
      isValid = false;
    }
    if (!nicNumber) {
      newErrors.nicNumber = 'NIC Number is required';
      isValid = false;
    }
    if (!contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
      isValid = false;
    }
    if (!bloodType) {
      newErrors.bloodType = 'Blood Type is required';
      isValid = false;
    }
    if (!gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    if (!lastDonationDate) {
      newErrors.lastDonationDate = 'Last Donation Date is required';
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
      const donorDetails = {
        name,
        nicNumber,
        contactNumber,
        email,
        address,
        dateOfBirth,
        bloodType,
        gender,
        lastDonationDate,
      };
      console.log(donorDetails);
      // Proceed with form submission (e.g., API call)

      createDonor(donorDetails).then((Response) => {
        console.log(Response.data);
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
                <label htmlFor="donor_name" className="block mb-2 text-lg font-medium text-left text-white">Donor's Name</label>
                <input
                  type="text"
                  id="donor_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
                {errors.donorName && <div className="text-red-500">{errors.donorName}</div>}
              </div>
              <div>
                <label htmlFor="nic_number" className="block mb-2 text-lg font-medium text-left text-white">NIC Number</label>
                <input
                  type="text"
                  id="nic_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-456-7890"
                  value={nicNumber}
                  onChange={(e) => setNicNumber(e.target.value)}
                  required
                />
                {errors.nicNumber && <div className="text-red-500">{errors.nicNumber}</div>}
              </div>
              <div>
                <label htmlFor="contact_number" className="block mb-2 text-lg font-medium text-left text-white">Contact Number</label>
                <input
                  type="tel"
                  id="contact_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-456-7890"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
                {errors.contactNumber && <div className="text-red-500">{errors.contactNumber}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block mb-2 text-lg font-medium text-left text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <div className="text-red-500">{errors.email}</div>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block mb-2 text-lg font-medium text-left text-white">Address</label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {errors.address && <div className="text-red-500">{errors.address}</div>}
              </div>
              <div>
                <label htmlFor="date_of_birth" className="block mb-2 text-lg font-medium text-left text-white">Date of Birth</label>
                <input
                  type="date"
                  id="date_of_birth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
                {errors.dateOfBirth && <div className="text-red-500">{errors.dateOfBirth}</div>}
              </div>
              <div>
                <label htmlFor="blood_type" className="block mb-2 text-lg font-medium text-left text-white">Blood Type</label>
                <select
                  id="blood_type"
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
                <label htmlFor="gender" className="block mb-2 text-lg font-medium text-left text-white">Gender</label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <div className="text-red-500">{errors.gender}</div>}
              </div>
              <div>
                <label htmlFor="last_donation_date" className="block mb-2 text-lg font-medium text-left text-white">Last Donation Date</label>
                <input
                  type="date"
                  id="last_donation_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={lastDonationDate}
                  onChange={(e) => setLastDonationDate(e.target.value)}
                  required
                />
                {errors.lastDonationDate && <div className="text-red-500">{errors.lastDonationDate}</div>}
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
