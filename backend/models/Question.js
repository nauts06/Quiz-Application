// models/Question.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  correctAnswer: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
