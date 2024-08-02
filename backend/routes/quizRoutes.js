// backend/routes/quizRoutes.js
const express = require('express');
const { getQuestions, submitAnswers, getLeaderboard } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/questions/:topic', protect, getQuestions);
router.post('/submit', protect, submitAnswers);
router.get('/leaderboard', protect, getLeaderboard);

module.exports = router;
