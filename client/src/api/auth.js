import axios from 'axios';

// Ganti ini dengan URL backend Anda saat di-deploy
// Untuk pengembangan, gunakan http://localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/api/auth/login', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (username, password) => {
    try {
        const response = await api.post('/api/auth/register', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};