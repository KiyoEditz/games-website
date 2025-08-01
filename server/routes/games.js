const express = require('express');
const Game = require('../models/Game');
const Score = require('../models/Score');
const protect = require('../middleware/auth'); // Middleware untuk melindungi rute

const router = express.Router();

// @route   GET /api/games
// @desc    Get all games
// @access  Public (bisa juga dilindungi jika hanya user login yang bisa melihat daftar game)
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        res.json(games);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/games/:gameId/score
// @desc    Submit score for a game
// @access  Private (membutuhkan token autentikasi)
router.post('/:gameId/score', protect, async (req, res) => {
    const { score } = req.body;
    const { gameId } = req.params;
    const userId = req.user.id; // Didapat dari middleware protect

    try {
        // Pastikan game ada
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Cari skor tertinggi user untuk game ini
        const existingHighScore = await Score.findOne({
            user: userId,
            game: gameId,
            isHighest: true
        });

        if (existingHighScore) {
            if (score > existingHighScore.score) {
                // Update skor lama menjadi tidak tertinggi
                existingHighScore.isHighest = false;
                await existingHighScore.save();

                // Buat skor baru sebagai yang tertinggi
                const newScore = await Score.create({
                    user: userId,
                    game: gameId,
                    score: score,
                    isHighest: true
                });
                res.status(201).json(newScore);
            } else {
                // Jika skor baru tidak lebih tinggi, tetap simpan sebagai rekaman (opsional)
                // Atau hanya beritahu bahwa highscore tidak dipecahkan
                await Score.create({
                    user: userId,
                    game: gameId,
                    score: score,
                    isHighest: false // Ini bukan highscore baru
                });
                res.status(200).json({ message: 'Score recorded, but not a new high score.' });
            }
        } else {
            // Jika belum ada skor sama sekali untuk user ini di game ini
            const newScore = await Score.create({
                user: userId,
                game: gameId,
                score: score,
                isHighest: true
            });
            res.status(201).json(newScore);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/games/add
// @desc    Add a new game (hanya untuk admin atau dev)
// @access  Private (contoh, bisa diatur role-based)
router.post('/add', protect, async (req, res) => {
    const { name, genre, description, thumbnailUrl } = req.body;
    try {
        const game = await Game.create({ name, genre, description, thumbnailUrl });
        res.status(201).json(game);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;