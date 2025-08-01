import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllGames, getGameLeaderboard } from '../api/games'; // Fungsi API kita

const GameSelectorPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gamesData = await getAllGames();
                // Untuk setiap game, fetch leaderboardnya
                const gamesWithLeaderboards = await Promise.all(gamesData.map(async (game) => {
                    try {
                        const leaderboard = await getGameLeaderboard(game._id);
                        return { ...game, leaderboard };
                    } catch (lbError) {
                        console.error(`Error fetching leaderboard for ${game.name}:`, lbError);
                        return { ...game, leaderboard: [] }; // Kembali dengan leaderboard kosong jika error
                    }
                }));
                setGames(gamesWithLeaderboards);
            } catch (err) {
                console.error('Error fetching games:', err);
                setError('Failed to load games. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) return <div style={styles.loading}>Loading games...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Select a Game</h1>
            <div style={styles.gameList}>
                {games.length === 0 ? (
                    <p>No games available yet. Please check back later!</p>
                ) : (
                    games.map((game) => (
                        <div key={game._id} style={styles.gameCard}>
                            <img src={game.thumbnailUrl} alt={game.name} style={styles.gameThumbnail} />
                            <h3 style={styles.gameName}>{game.name}</h3>
                            <p style={styles.gameGenre}>Genre: {game.genre}</p>
                            <p style={styles.gameDescription}>{game.description}</p>
                            <Link to={`/game/${game._id}`} style={styles.playButton}>Play Now</Link>

                            <div style={styles.leaderboardSection}>
                                <h4 style={styles.leaderboardHeading}>Top Scores:</h4>
                                {game.leaderboard && game.leaderboard.length > 0 ? (
                                    <ol style={styles.leaderboardList}>
                                        {game.leaderboard.map((entry, index) => (
                                            <li key={index} style={styles.leaderboardItem}>
                                                {entry.user.username}: {entry.score}
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p style={styles.noScore}>No scores yet!</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '40px',
        color: '#333',
        fontSize: '2.8em',
    },
    gameList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        justifyContent: 'center',
    },
    gameCard: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s ease-in-out',
    },
    gameCardHover: {
        transform: 'translateY(-5px)',
    },
    gameThumbnail: {
        width: '100%',
        maxWidth: '200px',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '15px',
        objectFit: 'cover',
    },
    gameName: {
        color: '#007bff',
        fontSize: '1.8em',
        marginBottom: '10px',
    },
    gameGenre: {
        color: '#666',
        fontSize: '1em',
        fontStyle: 'italic',
        marginBottom: '10px',
    },
    gameDescription: {
        color: '#555',
        fontSize: '0.95em',
        marginBottom: '20px',
        textAlign: 'center',
    },
    playButton: {
        display: 'inline-block',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '1.1em',
        fontWeight: 'bold',
        marginTop: 'auto', // Agar tombol selalu di bawah
        transition: 'background-color 0.3s ease',
    },
    playButtonHover: {
        backgroundColor: '#218838',
    },
    leaderboardSection: {
        marginTop: '25px',
        width: '100%',
        borderTop: '1px solid #eee',
        paddingTop: '15px',
    },
    leaderboardHeading: {
        color: '#333',
        fontSize: '1.3em',
        marginBottom: '10px',
    },
    leaderboardList: {
        listStyleType: 'none', // Remove default bullets
        padding: 0,
        margin: 0,
        textAlign: 'left',
        width: '80%',
        margin: '0 auto',
    },
    leaderboardItem: {
        backgroundColor: '#f8f9fa',
        padding: '8px 12px',
        borderRadius: '5px',
        marginBottom: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #e9ecef',
    },
    noScore: {
        color: '#888',
        fontStyle: 'italic',
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
    }
};

export default GameSelectorPage;