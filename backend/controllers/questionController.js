const asyncHandler = require('express-async-handler');
const Question = require('../models/Question');
const User = require('../models/User')

// @desc    Add a new question
// @route   POST /api/questions/add
// @access  Private
const addQuestion = asyncHandler(async (req, res) => {
    const { topic, question, options, correctAnswer } = req.body;
  
    if (!topic || !question || !options || !correctAnswer) {
      res.status(400);
      throw new Error('Please fill all fields');
    }
  
    const newQuestion = new Question({
      topic,
      question,
      options,
      correctAnswer
    });
  
    const savedQuestion = await newQuestion.save();
  
    res.status(201).json(savedQuestion);
  });

// Fetch Random Questions Function
const getRandomQuestions = asyncHandler(async (req, res) => {
    const { topic } = req.params;
  
    if (!topic) {
      res.status(400);
      throw new Error('Topic is required');
    }
  
    const questions = await Question.aggregate([
      { $match: { topic } },
      { $sample: { size: 5 } } // Adjust size as needed
    ]);
  
    res.status(200).json(questions);
  });
  // @desc    Check answers
// @route   POST /api/questions/check-answers
// @access  Private
const checkAnswers = asyncHandler(async (req, res) => {
    const { answers } = req.body;
    const userId = req.user._id;
    let score = 0;
    const results = {};
  
    for (const [questionId, userAnswer] of Object.entries(answers)) {
      const question = await Question.findById(questionId);
      if (question) {
        const isCorrect = question.correctAnswer === userAnswer;
        if (isCorrect) score += 1;
        results[questionId] = {
          question: question.question,
          correctAnswer: question.correctAnswer,
          userAnswer,
          isCorrect,
        };
      }
    }
  
    // Update user's score
    const user = await User.findById(userId);
    user.scores.push({ date: new Date(), score });
    await user.save();
  
    res.json({ score, results });
  });
  
  
  const getLeaderboard = asyncHandler(async (req, res) => {
    console.log('getLeaderboard endpoint hit');
  
    try {
      console.log('Fetching users from the database...');
      const users = await User.find().select('name scores');
      console.log("Users retrieved from database:", users);
  
      if (users.length === 0) {
        console.log('No users found in the database.');
      } else {
        console.log(`Found ${users.length} users.`);
      }
  
      console.log('Mapping leaderboard...');
      const leaderboard = users.map(user => {
        console.log(`Processing user: ${user.name}`);
        const bestScore = user.scores.reduce((max, score) => (score.score > max ? score.score : max), 0);
        console.log(`User ${user.name} best score: ${bestScore}`);
        return {
          name: user.name,
          bestScore: bestScore,
          scores: user.scores,
        };
      }).sort((a, b) => b.bestScore - a.bestScore);
  
      console.log('Leaderboard:', leaderboard);
  
      console.log('Sending response...');
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  
  



  module.exports = {
    addQuestion,
    getRandomQuestions,
    checkAnswers,
    getLeaderboard
  };
