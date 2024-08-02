const express = require('express');
const router = express.Router();
const { updateScore, getLeaderboard } = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware');

router.post('/update', protect, updateScore);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
