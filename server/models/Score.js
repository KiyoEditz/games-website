const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    // Ini bisa digunakan untuk menyimpan highscore per game per user
    isHighest: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index untuk query yang efisien
ScoreSchema.index({ user: 1, game: 1, score: -1 });

module.exports = mongoose.model('Score', ScoreSchema);