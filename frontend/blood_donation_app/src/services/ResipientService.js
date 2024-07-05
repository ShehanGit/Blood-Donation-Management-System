import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/recipients";

export const getRecipientList = () => axios.get(REST_API_BASE_URL);

export const createRecipient = (recipient) => axios.post(REST_API_BASE_URL, recipient);

export const getRecipientById = (recipientId) => axios.get(`${REST_API_BASE_URL}/${recipientId}`);

export const deleteRecipient = (recipientId) => axios.delete(`${REST_API_BASE_URL}/${recipientId}`);

export const updateRecipient = (recipientId, recipient) => axios.put(`${REST_API_BASE_URL}/${recipientId}`, recipient);


