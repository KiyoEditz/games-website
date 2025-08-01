import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllGames, submitGameScore } from '../api/games';
import { useAuth } from '../context/AuthContext';

// Import komponen game yang berbeda
// Pastikan path ini benar sesuai struktur games/
import TicTacToe from '../games/TicTacToe'; // Contoh Game 1

const GamePage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentGame, setCurrentGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fungsi untuk mendapatkan komponen game berdasarkan gameId
    const getGameComponent = (gameName) => {
        switch (gameName.toLowerCase().replace(/\s/g, '')) { // Normalisasi nama game
            case 'tictactoe':
                return TicTacToe;
            // Tambahkan game lain di sini
            // case 'rockpaperscissors':
            //     return RockPaperScissors;
            default:
                return () => <div>Game not found or not implemented yet!</div>;
        }
    };

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const games = await getAllGames();
                const foundGame = games.find(game => game._id === gameId);
                if (foundGame) {
                    setCurrentGame(foundGame);
                } else {
                    setError('Game not found.');
                }
            } catch (err) {
                console.error('Error fetching game details:', err);
                setError('Failed to load game details.');
            } finally {
                setLoading(false);
            }
        };
        fetchGameDetails();
    }, [gameId]);

    // Fungsi yang akan dipanggil oleh komponen game setelah game selesai
    const handleGameEnd = async (score) => {
        if (!user || !user.id) {
            alert('You must be logged in to submit scores.');
            return;
        }
        try {
            await submitGameScore(gameId, score);
            alert(`Score ${score} submitted successfully!`);
            navigate('/games'); // Kembali ke selektor game setelah submit
        } catch (err) {
            console.error('Error submitting score:', err);
            alert('Failed to submit score. Please try again.');
        }
    };

    if (loading) return <div style={styles.loading}>Loading game...</div>;
    if (error) return <div style={styles.error}>{error}</div>;
    if (!currentGame) return <div style={styles.error}>Game not found or inaccessible.</div>;

    const CurrentGameComponent = getGameComponent(currentGame.name);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Playing: {currentGame.name}</h1>
            <p style={styles.description}>{currentGame.description}</p>
            <div style={styles.gameArea}>
                <CurrentGameComponent onGameEnd={handleGameEnd} />
            </div>
            <button onClick={() => navigate('/games')} style={styles.backButton}>Back to Game Selector</button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        color: '#333',
        marginBottom: '10px',
    },
    description: {
        color: '#666',
        marginBottom: '20px',
        fontStyle: 'italic',
    },
    gameArea: {
        backgroundColor: '#e9ecef',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
        display: 'inline-block', // Agar game area tidak mengambil lebar penuh
        margin: '20px auto',
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
    backButton: {
        marginTop: '30px',
        backgroundColor: '#6c757d',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s ease',
    },
    backButtonHover: {
        backgroundColor: '#5a6268',
    }
};

export default GamePage;