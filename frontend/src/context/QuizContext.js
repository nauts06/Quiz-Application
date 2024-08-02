// frontend/src/context/QuizContext.js
import { createContext, useState } from 'react';
import quizService from '../services/quizService';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(null);

  const fetchQuestions = async (topic) => {
    const data = await quizService.fetchQuestions(topic);
    setQuestions(data);
  };

  const submitAnswers = async (userId, answers) => {
    const data = await quizService.submitAnswers(userId, answers);
    setScore(data.score);
  };

  return (
    <QuizContext.Provider value={{ questions, fetchQuestions, submitAnswers, score }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
