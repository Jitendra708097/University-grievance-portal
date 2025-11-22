const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

// Helper: Generate Token & Set Cookie
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 60*60*1000
    });

    // Cookie Options
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true, // Prevents JS from reading the cookie (XSS protection)
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict' // CSRF protection
    };

    res.status(statusCode)
        .cookie('token', token, options) // SET COOKIE HERE
        .json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            departmentManaged: user.departmentManaged
            // Note: We do NOT send the token in the JSON body anymore
        });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Spam Check: Validate University Email
    // if (!email.endsWith('@university.edu')) return res.status(400).json({message: "Only university emails allowed"});

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password: hashedPassword
    });

    if (user) {
        sendTokenResponse(user, 201, res);
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
};

exports.logout = async (req, res) => {
    // 1. Get token from cookie to add to Redis blacklist
    const token = req.cookies.token;
    
    if (token) {
        // Blacklist for 1 day (Safety measure in case cookie is stolen before logout)
        await redisClient.set(`blacklist_${token}`, 'true', 'EX', 24 * 60 * 60);
    }

    // 2. Clear the cookie
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
        httpOnly: true
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
};