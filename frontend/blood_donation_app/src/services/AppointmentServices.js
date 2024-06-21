import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/appointments";

// Fetch all appointments
export const listAppointments = () => axios.get(REST_API_BASE_URL);

// Create a new appointment
export const createAppointment = (appointment) => axios.post(REST_API_BASE_URL, appointment);

// Fetch an appointment by ID
export const getAppointmentById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

// Update an appointment by ID
export const updateAppointment = (id, appointment) => axios.put(`${REST_API_BASE_URL}/${id}`, appointment);

// Delete an appointment by ID
export const deleteAppointment = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
