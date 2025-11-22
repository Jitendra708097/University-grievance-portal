const Grievance = require('../models/Grievance');

// @desc    Create new grievance
// @access  Student Only
exports.createGrievance = async (req, res) => {
    try {
        const { title, description, departmentTarget, isAnonymous } = req.body;
        
        // If file uploaded via Multer, get URL
        const evidenceUrl = req.file ? req.file.path : null;

        const grievance = await Grievance.create({
            student: req.user._id,
            title,
            description,
            departmentTarget,
            evidenceUrl,
            isAnonymous: isAnonymous === 'true' // Parse string to boolean
        });

        res.status(201).json(grievance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my grievances
// @access  Student
exports.getMyGrievances = async (req, res) => {
    const grievances = await Grievance.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(grievances);
};

// @desc    Get Grievances for Admin
// @access  DeptAdmin (Own Dept) OR SuperAdmin (All/Central)
exports.getAdminGrievances = async (req, res) => {
    try {
        let query = {};

        if (req.user.role === 'SuperAdmin') {
            // VC/Chancellor sees EVERYTHING
            query = {}; 
        } else if (req.user.role === 'DeptAdmin') {
            // Dept Admin sees ONLY their department
            query = { departmentTarget: req.user.departmentManaged };
        } else {
            return res.status(403).json({ message: "Access Denied" });
        }

        // Populate student details but hide if anonymous
        const grievances = await Grievance.find(query)
            .populate('student', 'name email')
            .sort({ createdAt: -1 });

        // Logic to hide identity if anonymous (Client-side logic usually, but safe to do here)
        const sanitizedGrievances = grievances.map(g => {
            if (g.isAnonymous) g.student = { name: "Anonymous Student", email: "Hidden" };
            return g;
        });

        res.json(sanitizedGrievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports .updateStatus = async (req, res) => {
    const { status } = req.body;
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) return res.status(404).json({ message: "Not Found" });

    // Check if Admin belongs to same department (SuperAdmin can edit all)
    if (req.user.role !== 'SuperAdmin' && req.user.departmentManaged !== grievance.departmentTarget) {
        return res.status(403).json({ message: "Not authorized to manage this department" });
    }

    grievance.status = status;
    await grievance.save();
    res.json(grievance);
};