import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GameSelectorPage from './pages/GameSelectorPage';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage'; // Halaman untuk menampilkan game individual
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext'; // Akan kita buat nanti

// Komponen untuk rute yang dilindungi
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div>Loading...</div>; // Atau spinner
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<LoginPage isRegister={true} />} /> {/* Reuse login page for register */}
                    <Route path="/games" element={<PrivateRoute><GameSelectorPage /></PrivateRoute>} />
                    <Route path="/game/:gameId" element={<PrivateRoute><GamePage /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="*" element={<div>404 Not Found</div>} /> {/* Rute catch-all */}
                </Routes>
            </div>
        </>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;