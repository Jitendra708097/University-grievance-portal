const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true ,
    }, // Force @university.edu in validation
    password: { 
        type: String, 
        required: true,
        minLength: 6,
    },
    role: { 
        type: String, 
        enum: ['Student', 'DeptAdmin', 'SuperAdmin'], // SuperAdmin = VC/Chancellor
        default: 'Student' 
    },
    // If DeptAdmin, which department do they manage? (e.g., "ComputerScience", "Hostel")
    departmentManaged: { 
        type: String, 
        default: null 
    }, 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);