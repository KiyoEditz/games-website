import React from 'react';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to the Game Platform!</h1>
            <p style={styles.paragraph}>
                Log in or register to start playing exciting games and compete on the leaderboards.
            </p>
            <p style={styles.paragraph}>
                Explore various games, check your profile, and see who has the highest scores.
            </p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        maxWidth: '800px',
        margin: '50px auto',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    heading: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '2.5em',
    },
    paragraph: {
        color: '#555',
        lineHeight: '1.6',
        marginBottom: '15px',
        fontSize: '1.1em',
    }
};

export default HomePage;