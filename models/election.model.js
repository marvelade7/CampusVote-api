const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['upcoming', 'ongoing', 'completed'],
            default: 'upcoming',
        },  
        allowedVoters: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        candidates: [
            {
                name: String,
                position: String,
                votes: { type: Number, default: 0 },
            },
        ],
    },
    { timestamps: true }
);

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;