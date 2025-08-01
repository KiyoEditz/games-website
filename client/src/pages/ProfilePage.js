import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserScores, getOverallLeaderboard } from '../api/games'; // Fungsi API kita

const ProfilePage = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const [userScores, setUserScores] = useState([]);
    const [overallLeaderboard, setOverallLeaderboard] = useState([]);
    const [loadingScores, setLoadingScores] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated || !user?.id) {
                setLoadingScores(false);
                return;
            }

            try {
                // Fetch user's scores
                const scores = await getUserScores(user.id);
                setUserScores(scores);

                // Fetch overall leaderboard
                const overallLb = await getOverallLeaderboard();
                setOverallLeaderboard(overallLb);

            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data.');
            } finally {
                setLoadingScores(false);
            }
        };

        if (!authLoading) {
            fetchUserData();
        }
    }, [isAuthenticated, user, authLoading]);

    if (authLoading || loadingScores) return <div style={styles.loading}>Loading profile...</div>;
    if (error) return <div style={styles.error}>{error}</div>;
    if (!isAuthenticated || !user) return <div style={styles.notLoggedIn}>Please log in to view your profile.</div>;


    // Hitung total poin
    const totalPoints = userScores.reduce((sum, score) => sum + (score.isHighest ? score.score : 0), 0);
    // Atau bisa juga menggunakan totalScore dari API Leaderboard Overall jika lebih akurat

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome, {user.username}!</h1>
            <div style={styles.profileSection}>
                <h2 style={styles.sectionHeading}>Your Scores</h2>
                <p style={styles.totalPoints}>Total Highest Points: <span style={styles.totalPointsValue}>{totalPoints}</span></p>
                {userScores.length === 0 ? (
                    <p style={styles.noData}>You haven't played any games or submitted scores yet!</p>
                ) : (
                    <ul style={styles.scoreList}>
                        {userScores.map((score) => (
                            <li key={score._id} style={styles.scoreItem}>
                                <span style={styles.scoreGameName}>{score.game?.name || 'Unknown Game'}</span>:
                                <span style={styles.scoreValue}> {score.score}</span> points ({score.isHighest ? 'Highest' : 'Recorded'})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={styles.profileSection}>
                <h2 style={styles.sectionHeading}>Global Leaderboard (Top 10 Overall)</h2>
                {overallLeaderboard.length === 0 ? (
                    <p style={styles.noData}>No global scores yet!</p>
                ) : (
                    <ol style={styles.leaderboardList}>
                        {overallLeaderboard.map((entry, index) => (
                            <li key={index} style={styles.leaderboardItem}>
                                <span style={styles.leaderboardRank}>#{index + 1}</span>
                                <span style={styles.leaderboardUsername}>{entry.username}</span>:
                                <span style={styles.leaderboardScore}>{entry.totalScore}</span> points
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '50px auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
        fontSize: '2.5em',
    },
    profileSection: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '8px',
        marginBottom: '25px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    sectionHeading: {
        color: '#007bff',
        marginBottom: '20px',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
        fontSize: '1.8em',
    },
    totalPoints: {
        fontSize: '1.4em',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#555',
    },
    totalPointsValue: {
        color: '#28a745',
        fontSize: '1.2em',
    },
    scoreList: {
        listStyleType: 'none',
        padding: 0,
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: '5px',
    },
    scoreItem: {
        padding: '12px 15px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fdfdfd',
    },
    scoreItemLast: {
        borderBottom: 'none',
    },
    scoreGameName: {
        fontWeight: 'bold',
        color: '#333',
        flexGrow: 1,
    },
    scoreValue: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    noData: {
        fontStyle: 'italic',
        color: '#888',
        padding: '10px',
        textAlign: 'center',
    },
    leaderboardList: {
        listStyleType: 'none',
        padding: 0,
    },
    leaderboardItem: {
        padding: '12px 15px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fdfdfd',
    },
    leaderboardRank: {
        fontWeight: 'bold',
        marginRight: '15px',
        width: '30px',
        textAlign: 'center',
        color: '#555',
    },
    leaderboardUsername: {
        fontWeight: 'bold',
        color: '#333',
        flexGrow: 1,
    },
    leaderboardScore: {
        color: '#28a745',
        fontWeight: 'bold',
        fontSize: '1.1em',
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '1.5em',
        color: '#007bff',
    },
    error: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '1.5em',
        color: 'red',
    },
    notLoggedIn: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '1.2em',
        color: '#888',
    }
};

export default ProfilePage;