const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Select topics for a user
// @route   POST /api/topics/select
// @access  Private
const selectTopics = asyncHandler(async (req, res) => {
  const { userId, topics } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.selectedTopics = topics;
  await user.save();

  res.status(200).json({ message: 'Topics selected successfully', topics: user.selectedTopics });
});

module.exports = {
  selectTopics,
};
