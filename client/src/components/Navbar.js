import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.navBrand}>
                <Link to="/" style={styles.navLink}>Game Platform</Link>
            </div>
            <ul style={styles.navList}>
                {isAuthenticated ? (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/games" style={styles.navLink}>Games</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/profile" style={styles.navLink}>Profile</Link>
                        </li>
                        <li style={styles.navItem}>
                            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/login" style={styles.navLink}>Login</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/register" style={styles.navLink}>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    navBrand: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '20px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    navLinkHover: {
        backgroundColor: '#4a4f5d',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    logoutButtonHover: {
        backgroundColor: '#c82333',
    }
};

export default Navbar;