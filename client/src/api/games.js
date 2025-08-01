import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Middleware untuk menambahkan token ke setiap request yang dilindungi
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllGames = async () => {
    try {
        const response = await api.get('/api/games');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGameLeaderboard = async (gameId) => {
    try {
        const response = await api.get(`/api/leaderboard/${gameId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitGameScore = async (gameId, score) => {
    try {
        const response = await api.post(`/api/games/${gameId}/score`, { score });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserScores = async (userId) => {
    try {
        const response = await api.get(`/api/leaderboard/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOverallLeaderboard = async () => {
    try {
        const response = await api.get('/api/leaderboard/overall');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fungsi tambahan untuk menambahkan game (misal untuk testing/admin)
export const addGame = async (gameData) => {
    try {
        const response = await api.post('/api/games/add', gameData);
        return response.data;
    } catch (error) {
        throw error;
    }
};