const express = require('express');
const { createGrievance, getMyGrievances, getAdminGrievances, updateStatus } = require('../controllers/grievanceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createGrievanceLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Student Routes
// Rate Limiter applied here to prevent spamming the DB
router.post('/', protect, authorize('Student'), createGrievanceLimiter, upload.single('evidence'), createGrievance);
router.get('/my', protect, authorize('Student'), getMyGrievances);

// Admin Routes (Dept Admin & SuperAdmin)
router.get('/admin/all', protect, authorize('DeptAdmin', 'SuperAdmin'), getAdminGrievances);
router.put('/:id/status', protect, authorize('DeptAdmin', 'SuperAdmin'),updateStatus);

module.exports = router;