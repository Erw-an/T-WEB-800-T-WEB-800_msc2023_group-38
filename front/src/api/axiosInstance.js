import axios from 'axios';

/* eslint-disable no-param-reassign */

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = 'Bearer '.concat(sessionStorage.getItem('token'));
    config.headers.Authorization = token;

    return config;
});

export default axiosInstance;
