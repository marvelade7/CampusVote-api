const User = require("../models/user.model");
const Election = require("../models/election.model");
const ContestApplication = require("../models/contestApplication.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;