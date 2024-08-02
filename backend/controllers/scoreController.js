const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Update user score
const updateScore = asyncHandler(async (req, res) => {
  const { topic, score } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (user) {
    user.scores.push({ topic, score });
    await user.save();
    res.json({ message: 'Score updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get leaderboard
const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find().select('name scores');

  const leaderboard = users.map(user => ({
    name: user.name,
    bestScore: user.scores.reduce((max, score) => (score.score > max ? score.score : max), 0),
    scores: user.scores,
  })).sort((a, b) => b.bestScore - a.bestScore);

  res.json(leaderboard);
});

module.exports = { updateScore, getLeaderboard };
