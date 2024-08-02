import React, { useEffect, useState } from 'react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const selectedTopics = JSON.parse(localStorage.getItem('selectedTopics'));

      try {
        const response = await fetch(`http://localhost:8000/api/questions/${selectedTopics[0]}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Network error');
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (optionText) => {
    setSelectedAnswer(optionText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const currentQuestion = questions[currentQuestionIndex];

    try {
      const response = await fetch('http://localhost:8000/api/questions/check-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          answers: { [currentQuestion._id]: selectedAnswer },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setScore(data.score);
        setResults((prevResults) => [
          ...prevResults,
          {
            questionId: currentQuestion._id,
            question: currentQuestion.question,
            yourAnswer: selectedAnswer,
            correctAnswer: data.results[currentQuestion._id].correctAnswer,
            isCorrect: data.results[currentQuestion._id].isCorrect,
          },
        ]);
        setSelectedAnswer('');
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setIsQuizCompleted(true);
        }
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-3/4 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-center">Questions</h1>
        {error && <p className="text-red-500">{error}</p>}
        {isQuizCompleted ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Quiz Completed</h2>
            <p>Your Score: {score}</p>
            <ul>
              {results.map((result) => (
                <li key={result.questionId} className="mb-2">
                  <p className="font-bold">Question: {result.question}</p>
                  <p>Your Answer: {result.yourAnswer}</p>
                  <p>
                    {result.isCorrect ? (
                      <span className="text-green-500">Correct</span>
                    ) : (
                      <span className="text-red-500">
                        Incorrect (Correct Answer: {result.correctAnswer})
                      </span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          currentQuestion && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="font-bold">Question: {currentQuestion.question}</p>
                <ul>
                  {currentQuestion.options.map((option, index) => (
                    <li key={index} className="ml-4 list-disc">
                      <label>
                        <input
                          type="radio"
                          name="answer"
                          value={option.text}
                          checked={selectedAnswer === option.text}
                          onChange={() => handleAnswerSelect(option.text)}
                          className="mr-2"
                        />
                        {option.text}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Answer
              </button>
            </form>
          )
        )}
      </div>
    </div>
  );
};

export default Questions;
