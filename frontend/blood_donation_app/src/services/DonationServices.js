import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/donations";

// Fetch all donations
export const getDonationList = () => axios.get(REST_API_BASE_URL);

// Create a new donation
export const createDonation = (donation) => axios.post(REST_API_BASE_URL, donation);

// Fetch a donation by ID
export const getDonationById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

// Update a donation by ID
export const updateDonation = (id, donation) => axios.put(`${REST_API_BASE_URL}/${id}`, donation);

// Delete a donation by ID
export const deleteDonation = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
