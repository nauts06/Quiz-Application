// backend/controllers/quizController.js
const asyncHandler = require('express-async-handler');
const Question = require('../models/Question');
const Score = require('../models/Score');

const getQuestions = asyncHandler(async (req, res) => {
  const topic = req.params.topic;
  const questions = await Question.find({ topic });
  res.json(questions);
});

const submitAnswers = asyncHandler(async (req, res) => {
  const { userId, answers } = req.body;
  let score = 0;

  for (const answer of answers) {
    const question = await Question.findById(answer.questionId);
    if (question.correctAnswer === answer.answer) {
      score += 1;
    }
  }

  await Score.create({ user: userId, score });
  res.json({ score });
});

const getLeaderboard = asyncHandler(async (req, res) => {
  const scores = await Score.find().populate('user', 'name').sort({ score: -1 });
  res.json(scores);
});

module.exports = { getQuestions, submitAnswers, getLeaderboard };
