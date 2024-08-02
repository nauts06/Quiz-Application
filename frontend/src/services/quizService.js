// frontend/src/services/quizService.js
import axios from 'axios';

const API_URL = '/api/quiz/';

const fetchQuestions = async (topic) => {
  const response = await axios.get(API_URL + `questions/${topic}`);
  return response.data;
};

const submitAnswers = async (userId, answers) => {
  const response = await axios.post(API_URL + 'submit', { userId, answers });
  return response.data;
};

const fetchLeaderboard = async () => {
  const response = await axios.get(API_URL + 'leaderboard');
  return response.data;
};

const quizService = {
  fetchQuestions,
  submitAnswers,
  fetchLeaderboard,
};

export default quizService;
