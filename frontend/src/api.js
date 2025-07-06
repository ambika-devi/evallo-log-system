import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export const fetchLogs = async (filters) => {
  const res = await axios.get(`${BASE_URL}/logs`, { params: filters });
  return res.data;
};
