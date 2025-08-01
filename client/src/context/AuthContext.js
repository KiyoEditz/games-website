import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, register } from '../api/auth'; // Fungsi API kita

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const loginUser = async (username, password) => {
        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ id: data._id, username: data.username }));
            setIsAuthenticated(true);
            setUser({ id: data._id, username: data.username });
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
            setUser(null);
            throw error; // Lempar error agar bisa ditangkap di komponen LoginPage
        }
    };

    const registerUser = async (username, password) => {
        try {
            const data = await register(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ id: data._id, username: data.username }));
            setIsAuthenticated(true);
            setUser({ id: data._id, username: data.username });
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            setIsAuthenticated(false);
            setUser(null);
            throw error; // Lempar error
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};