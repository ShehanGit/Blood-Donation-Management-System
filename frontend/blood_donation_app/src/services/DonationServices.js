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

const APPOINTMENT_API_BASE_URL = "http://localhost:8080/appointments";

// Fetch all appointments
export const listAppointments = () => axios.get(APPOINTMENT_API_BASE_URL);

// Create a new appointment
export const createAppointment = (appointment) => axios.post(APPOINTMENT_API_BASE_URL, appointment);

// Fetch an appointment by ID
export const getAppointmentById = (id) => axios.get(`${APPOINTMENT_API_BASE_URL}/${id}`);

// Update an appointment by ID
export const updateAppointment = (id, appointment) => axios.put(`${APPOINTMENT_API_BASE_URL}/${id}`, appointment);

// Delete an appointment by ID
export const deleteAppointment = (id) => axios.delete(`${APPOINTMENT_API_BASE_URL}/${id}`);

// Fetch appointment statistics
export const getAppointmentStats = () => axios.get(`${APPOINTMENT_API_BASE_URL}/stats`);
