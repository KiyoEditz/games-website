import React, { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

const TicTacToe = ({ onGameEnd }) => {
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0); // Skor untuk game ini

    useEffect(() => {
        const winner = calculateWinner(board);
        if (winner) {
            setStatus('Winner: ' + winner);
            setGameOver(true);
            setScore(winner === 'X' ? 100 : 50); // Contoh skor: X menang 100, O menang 50
            if (onGameEnd) {
                onGameEnd(winner === 'X' ? 100 : 50); // Panggil fungsi dari GamePage
            }
        } else if (board.every(Boolean)) { // Semua kotak terisi
            setStatus('Draw!');
            setGameOver(true);
            setScore(75); // Contoh skor untuk draw
            if (onGameEnd) {
                onGameEnd(75); // Panggil fungsi dari GamePage
            }
        } else {
            setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
        }
    }, [board, xIsNext, onGameEnd]);

    const handleClick = (i) => {
        if (board[i] || calculateWinner(board) || gameOver) {
            return;
        }
        const newBoard = board.slice();
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => {
        return (
            <button style={styles.square} onClick={() => handleClick(i)}>
                {board[i]}
            </button>
        );
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setXIsNext(true);
        setGameOver(false);
        setStatus('');
        setScore(0);
    };

    return (
        <div style={styles.gameContainer}>
            <div style={styles.status}>{status}</div>
            <div style={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div style={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div style={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            {gameOver && (
                <div style={styles.gameOverSection}>
                    <p style={styles.gameOverText}>{status} {score > 0 ? ` (Score: ${score})` : ''}</p>
                    <button onClick={resetGame} style={styles.resetButton}>Play Again</button>
                </div>
            )}
        </div>
    );
};

// Helper function to calculate winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const styles = {
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        width: 'fit-content',
        margin: '20px auto',
    },
    status: {
        marginBottom: '20px',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#333',
    },
    boardRow: {
        display: 'flex',
    },
    square: {
        width: '80px',
        height: '80px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #999',
        fontSize: '3em',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '-1px', // Untuk membuat border menyatu
        transition: 'background-color 0.2s ease',
    },
    squareHover: {
        backgroundColor: '#e0e0e0',
    },
    gameOverSection: {
        marginTop: '20px',
        textAlign: 'center',
    },
    gameOverText: {
        fontSize: '1.3em',
        color: '#d9534f',
        marginBottom: '15px',
    },
    resetButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s ease',
    },
    resetButtonHover: {
        backgroundColor: '#0056b3',
    }
};


export default TicTacToe;