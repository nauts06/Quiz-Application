// backend/routes/authRoutes.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { registerUser, authUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
