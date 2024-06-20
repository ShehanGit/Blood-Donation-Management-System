import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/donors";

export const listExamDetails = () => axios.get(REST_API_BASE_URL);

export const createDoner = (doner) => axios.post(REST_API_BASE_URL, doner);

export const getExamById = (examId) => axios.get(REST_API_BASE_URL + '/' + examId); 

export const deleteExamData = (examId) => axios.delete(REST_API_BASE_URL + '/' + examId);

export const updateExamData = (examId, exam) => axios.put(REST_API_BASE_URL + '/' + examId, exam);

