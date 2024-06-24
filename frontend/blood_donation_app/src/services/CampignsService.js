import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/campaigns";

export const getCampaignList = () => axios.get(REST_API_BASE_URL);

export const createCampaign = (campaign) => axios.post(REST_API_BASE_URL, campaign);

export const getCampaignById = (campaignId) => axios.get(`${REST_API_BASE_URL}/${campaignId}`);

export const deleteCampaign = (campaignId) => axios.delete(`${REST_API_BASE_URL}/${campaignId}`);

export const updateCampaign = (campaignId, campaign) => axios.put(`${REST_API_BASE_URL}/${campaignId}`, campaign);
