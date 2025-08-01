const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String, // URL ke gambar thumbnail game
        default: 'https://via.placeholder.com/150'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);