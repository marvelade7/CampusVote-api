const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const postSignupUser = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        matricNumber,
        faculty,
        department,
        level,
        termsAccepted,
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    if (!termsAccepted) {
        return res
            .status(400)
            .json({ message: "You must accept the terms and conditions" });
    }

    User.findOne({ email }).then((existingUser) => {
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
    });

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        matricNumber,
        faculty,
        department,
        level,
        termsAccepted,
    });
    newUser
        .save()
        .then((user) => {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            // console.log(user);
            res.status(201).json({
                token,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    department: user.department,
                    faculty: user.faculty,
                    level: user.level,
                    faculty: user.faculty,
                    profilePicture: user.profilePicture,
                    role: user.role,
                },
            });
        })
        .catch((err) => {
            console.error("Error creating user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};

const postLoginUser = (req, res) => {
    const { identifier, password } = req.body;

    User.findOne({
        $or: [{ email: identifier }, { matricNumber: identifier }],
    })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res
                    .status(400)
                    .json({ message: "Incorrect login details" });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            // console.log(user);
            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    department: user.department,
                    faculty: user.faculty,
                    level: user.level,
                    faculty: user.faculty,
                    profilePicture: user.profilePicture,
                    role: user.role,
                },
            });
        })
        .catch((err) => {
            console.error("Error logging in user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};

const postAdminLogin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            if (user.role !== "admin") {
                return res.status(403).json({ message: "Access denied" });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res
                    .status(400)
                    .json({ message: "Incorrect login details" });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            // console.log(user);
            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    department: user.department,
                    faculty: user.faculty,
                    level: user.level,
                    faculty: user.faculty,
                    profilePicture: user.profilePicture,
                    role: user.role,
                },
            });
        })
        .catch((err) => {
            console.error("Error logging in admin:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};

const getProfile = (req, res) => {
    const userId = req.userId;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                department: user.department,
                faculty: user.faculty,
                level: user.level,
                profilePicture: user.profilePicture,
                role: user.role,
            });
        })
        .catch((err) => {
            console.error("Error fetching profile:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};

const getStudentDashboard = (req, res) => {
    return getProfile(req, res);
};

const getAdminDashboard = (req, res) => {
    const userId = req.userId;

    User.findById(userId)
        .then((user) => {
            if (!user) return res.status(404).json({ message: "User not found" });

            if (user.role !== "admin") {
                return res.status(403).json({ message: "Access denied" });
            }

            return res.status(200).json({
                ...user.toObject(),
                adminTools: true,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
};



module.exports = {
    postSignupUser,
    postLoginUser,
    getStudentDashboard,
    getAdminDashboard,
    getProfile,
    postAdminLogin,
};
