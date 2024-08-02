const express = require('express');
const router = express.Router();
const { addQuestion, getRandomQuestions , checkAnswers , getLeaderboard} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addQuestion);
router.get('/:topic', protect, getRandomQuestions);

router.post('/check-answers', protect, checkAnswers);
router.get('/leaderboard', protect, getLeaderboard);

module.exports = router;
