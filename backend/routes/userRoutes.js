const express = require('express');
const { updateTopics } = require('../controllers/userController');
const router = express.Router();

router.post('/select', updateTopics);

module.exports = router;
