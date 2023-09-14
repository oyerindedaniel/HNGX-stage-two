import Axios from 'axios';
import { API_READ_ACCESS_TOKEN } from '../config';

const axiosInstance = Axios.create({
  // baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    Accept: 'application/json'
  }
});

// axiosInstance.defaults.withCredentials = true;

export const axios = axiosInstance;

export const AxiosObject = Axios;
