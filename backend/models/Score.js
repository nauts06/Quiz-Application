// backend/models/Score.js
const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  score: { type: Number, required: true },
}, {
  timestamps: true,
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
