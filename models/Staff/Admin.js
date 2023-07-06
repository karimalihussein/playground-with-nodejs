const mongoose  = require('mongoose');
const { Schema } = mongoose;
const adminSchema = Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff'],
        default: 'staff'
    }

}, {timestamps: true});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
