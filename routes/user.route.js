const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const { postSignupUser, postLoginUser } = require('../controllers/user.controller');

router.post('/signup', postSignupUser);
router.post('/login', postLoginUser);
// router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;