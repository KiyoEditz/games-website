const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Untuk mengizinkan koneksi dari frontend yang berbeda port/domain
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const leaderboardRoutes = require('./routes/leaderboard');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser untuk JSON
app.use(cors()); // Mengizinkan semua origin untuk development. Di produksi, batasi ke domain frontend Anda.

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Game Platform API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));