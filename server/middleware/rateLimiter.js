const rateLimit = require('express-rate-limit');

// Allow max 5 grievances created per hour per IP
const createGrievanceLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, 
    message: 'Too many grievances filed from this IP, please try again after an hour.'
});

module.exports = { createGrievanceLimiter };