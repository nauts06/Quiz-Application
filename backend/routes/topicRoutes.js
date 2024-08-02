const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { selectTopics } = require('../controllers/topicController');

router.post('/select', protect, selectTopics);

module.exports = router;
