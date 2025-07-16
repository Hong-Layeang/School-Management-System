import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001/', // Updated to match backend port
});

const token = localStorage.getItem('token');
if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default API;
