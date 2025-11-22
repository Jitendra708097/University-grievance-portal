const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 150 
    },
    description: { 
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 500 
    },
    // Which department is this complaint for?
    departmentTarget: { 
        type: String, 
        required: true, 
        enum: ['ComputerScience', 'Electrical', 'Hostel', 'ExamCell', 'ViceChancellor'] 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], 
        default: 'Pending' 
    },
    evidenceUrl: { type: String }, // Cloudinary URL
    isAnonymous: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Grievance', grievanceSchema);