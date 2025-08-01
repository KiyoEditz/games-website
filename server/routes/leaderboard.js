const express = require('express');
const Score = require('../models/Score');
const User = require('../models/User');
const Game = require('../models/Game');
const protect = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/leaderboard/overall
// @desc    Get top overall leaderboard (total points across all games)
// @access  Public
router.get('/overall', async (req, res) => {
    // ... (Logika yang sudah ada)
});


// @route   GET /api/leaderboard/user/:userId
// @desc    Get all scores for a specific user
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
    // ... (Logika yang sudah ada)
});


// @route   GET /api/leaderboard/:gameId
// @desc    Get top 3 leaderboard for a specific game
// @access  Public
router.get('/:gameId', async (req, res) => {
    // ... (Logika yang sudah ada)
});

module.exports = router;