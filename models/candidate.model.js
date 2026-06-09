const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        electionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Election',
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        faculty: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            enum: [100, 200, 300, 400, 500, 600],
            required: true,
        },
        manifesto: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        votes: {
            type: Number,
            default: 0,
        },
        position: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);  

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;