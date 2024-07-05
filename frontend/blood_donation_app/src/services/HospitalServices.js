import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/hospitals";

export const getHospitalList = () => axios.get(REST_API_BASE_URL);

export const createHospital = (hospital) => axios.post(REST_API_BASE_URL, hospital);

export const getHospitalById = (hospitalId) => axios.get(`${REST_API_BASE_URL}/${hospitalId}`);

export const deleteHospital = (hospitalId) => axios.delete(`${REST_API_BASE_URL}/${hospitalId}`);

export const updateHospital = (hospitalId, hospital) => axios.put(`${REST_API_BASE_URL}/${hospitalId}`, hospital);
