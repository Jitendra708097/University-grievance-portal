const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in cookies
    if (req.cookies.token) {
        try {
            token = req.cookies.token;

            // 1. Check Redis Blacklist
            const isBlacklisted = await redisClient.get(`blacklist_${token}`);
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Session expired, please login again' });
            }

            // 2. Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};

module.exports = { protect, authorize };