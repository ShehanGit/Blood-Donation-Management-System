import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/blood_inventory";

// Fetch all blood inventory entries
export const listBloodInventory = () => axios.get(REST_API_BASE_URL);

// Create a new blood inventory entry
export const createBloodInventory = (bloodInventory) => axios.post(REST_API_BASE_URL, bloodInventory);

// Fetch a blood inventory entry by ID
export const getBloodInventoryById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

// Update a blood inventory entry by ID
export const updateBloodInventory = (id, bloodInventory) => axios.put(`${REST_API_BASE_URL}/${id}`, bloodInventory);

// Delete a blood inventory entry by ID
export const deleteBloodInventoryItem = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
