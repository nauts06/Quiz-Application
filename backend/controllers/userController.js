const User = require('../models/User');

// Update user topics
const updateTopics = async (req, res) => {
  const { userId, topics } = req.body;

  if (!userId || !Array.isArray(topics)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.selectedTopics = topics;
    await user.save();

    res.status(200).json({ message: 'Topics updated successfully', selectedTopics: user.selectedTopics });
  } catch (error) {
    console.error('Error updating topics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  updateTopics,
};
