const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); // Import
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const redisClient = require('./config/redis');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Initialize Cookie Parser

// CORS Configuration (Crucial for Cookies)
app.use(cors({
    origin: 'http://localhost:5173', // Your React Frontend URL (Change if different)
    credentials: true, // Allow cookies to be sent
}));

app.use(helmet());

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);

const startServer = async() => {

    try{ 

        await connectDB();
        console.log('Connected to MongoDB');

        await redisClient.connect();
        console.log('Connected to Redis');

        app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);

        
    });

    } catch (error) {
        console.error('Error starting server:', error);
    }
}

 startServer();