// Add this to your main server file (server.js or app.js)

// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for profile pictures
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctors-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', userRoutes); // Mount user routes

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Doctors Network API is running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
