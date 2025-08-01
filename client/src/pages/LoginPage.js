import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ isRegister = false }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loginUser, registerUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                await registerUser(username, password);
                alert('Registration successful! You are now logged in.');
            } else {
                await loginUser(username, password);
                alert('Login successful!');
            }
            navigate('/games'); // Redirect ke halaman game setelah login/register
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>{isRegister ? 'Register' : 'Login'}</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
                </button>
            </form>
            <p style={styles.toggleText}>
                {isRegister ? (
                    <>
                        Already have an account? <span onClick={() => navigate('/login')} style={styles.toggleLink}>Login here</span>
                    </>
                ) : (
                    <>
                        Don't have an account? <span onClick={() => navigate('/register')} style={styles.toggleLink}>Register here</span>
                    </>
                )}
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '25px',
        color: '#333',
        fontSize: '2em',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '12px 10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1em',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
        fontWeight: 'bold',
    },
    toggleText: {
        marginTop: '20px',
        color: '#666',
    },
    toggleLink: {
        color: '#007bff',
        cursor: 'pointer',
        textDecoration: 'underline',
    }
};

export default LoginPage;