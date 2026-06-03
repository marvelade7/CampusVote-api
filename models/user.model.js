const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
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
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'student',],
            default: 'student',
        },
        matricNumber: {
            type: String,
            required: true,
            unique: true,
        },
        faculty: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            enum: [100, 200, 300, 400, 500, 600],
            required: true,
        },
        profilePicture: {
            type: String,
        },
        termsAccepted: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;