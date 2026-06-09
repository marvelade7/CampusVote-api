const mongoose = require("mongoose");

const contestApplicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        electionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Election",
            required: true,
        },

        position: {
            type: String,
            required: true,
        },

        motivation: {
            type: String,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ContestApplication", contestApplicationSchema);