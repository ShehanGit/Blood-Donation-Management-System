import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/donors";

export const getDonorList = () => axios.get(REST_API_BASE_URL);

export const createDonor = (donor) => axios.post(REST_API_BASE_URL, donor);

export const getDonorById = (donorId) => axios.get(`${REST_API_BASE_URL}/${donorId}`);

export const deleteDonor = (donorId) => axios.delete(`${REST_API_BASE_URL}/${donorId}`);

export const updateDonor = (donorId, donor) => axios.put(`${REST_API_BASE_URL}/${donorId}`, donor);
