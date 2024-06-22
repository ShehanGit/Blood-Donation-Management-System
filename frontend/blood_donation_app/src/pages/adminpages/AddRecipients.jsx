import React, { useState } from "react";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import '../../css/AddRecipient.css';
import { createRecipient } from "../../services/ResipientService";

export default function AddRecipients() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [bloodTypeNeeded, setBloodTypeNeeded] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [receivingDate, setReceivingDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    contactNumber: '',
    bloodTypeNeeded: '',
    urgencyLevel: '',
    receivingDate: '',
    termsAccepted: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = "Recipient's Name is required";
      isValid = false;
    }
    if (!contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
      isValid = false;
    }
    if (!bloodTypeNeeded) {
      newErrors.bloodTypeNeeded = 'Blood Type Needed is required';
      isValid = false;
    }
    if (!urgencyLevel) {
      newErrors.urgencyLevel = 'Urgency Level is required';
      isValid = false;
    }
    if (!receivingDate) {
      newErrors.receivingDate = 'Receiving Date is required';
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
      const recipientDetails = {
        name,
        contactNumber,
        bloodTypeNeeded,
        urgencyLevel,
        receivingDate,
      };
      console.log(recipientDetails);

      createRecipient(recipientDetails).then((Response) => {
        console.log(Response.data);
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} />
        <div className="center-container">
          <div className="container1">
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-lg font-medium text-left text-white">
                    Recipient's Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block mb-2 text-lg font-medium text-left text-white">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="+1234567890"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                  {errors.contactNumber && <div className="text-red-500">{errors.contactNumber}</div>}
                </div>
                <div>
                  <label htmlFor="bloodTypeNeeded" className="block mb-2 text-lg font-medium text-left text-white">
                    Blood Type Needed
                  </label>
                  <select
                    id="bloodTypeNeeded"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={bloodTypeNeeded}
                    onChange={(e) => setBloodTypeNeeded(e.target.value)}
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
                  {errors.bloodTypeNeeded && <div className="text-red-500">{errors.bloodTypeNeeded}</div>}
                </div>
                <div>
                  <label htmlFor="urgencyLevel" className="block mb-2 text-lg font-medium text-left text-white">
                    Urgency Level
                  </label>
                  <select
                    id="urgencyLevel"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value)}
                    required
                  >
                    <option value="">Select Urgency Level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  {errors.urgencyLevel && <div className="text-red-500">{errors.urgencyLevel}</div>}
                </div>
                <div>
                  <label htmlFor="receivingDate" className="block mb-2 text-lg font-medium text-left text-white">
                    Receiving Date
                  </label>
                  <input
                    type="date"
                    id="receivingDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={receivingDate}
                    onChange={(e) => setReceivingDate(e.target.value)}
                    required
                  />
                  {errors.receivingDate && <div className="text-red-500">{errors.receivingDate}</div>}
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
    </div>
  );
}
