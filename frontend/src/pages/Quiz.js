import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const subjects = ['Math', 'Science', 'History', 'Geography']

  const handleSelectedSubject = async (subject)=>{
    // console.log("selectedSubject",subject);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setSelectedSubject(subject)
    try {
      const response = await fetch(`http://localhost:8000/api/questions/${subject}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("bghunhudata",data);
        setQuestions(data);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Network error');
    }

  }
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

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.options.find(option => option.isCorrect)?.text) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
      await updateScore(score + 1);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer('');
    }
  };

  const updateScore = async (finalScore) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    try {
      const response = await fetch('http://localhost:8000/api/scores/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          topic: JSON.parse(localStorage.getItem('selectedTopics'))[0],
          score: finalScore,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-3/4 lg:w-1/2">
        {quizCompleted ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Quiz Completed</h1>
            <p>Your Score: {score}</p>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={() => navigate('/leaderboard')}
            >
              View Leaderboard
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">Quiz</h1>
            {error && <p className="text-red-500">{error}</p>}
            {questions.length === 0 ? (
              <p>No questions found.</p>
            ) : (
              <>
                {/* <div className="mb-4">
                  <p className="font-bold">Question: {questions[currentQuestionIndex].question}</p>
                  <ul>
                    {questions[currentQuestionIndex].options.map((option) => (
                      <li
                        key={option._id}
                        className={`ml-4 list-disc cursor-pointer ${selectedAnswer === option.text ? 'bg-gray-200' : ''}`}
                        onClick={() => handleAnswerSelect(option.text)}
                      >
                        {option.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="mt-4 p-2 bg-blue-500 text-white rounded"
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
                </button> */}

<div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 font-semibold mb-2">Select Subject</label>
        <select
          value={selectedSubject}
          onChange={(e)=>handleSelectedSubject(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

<div className="mb-4">
  <p className="font-bold text-lg mb-2">{questions[currentQuestionIndex]?.question }</p>
  <div className="space-y-2">
    {questions[currentQuestionIndex]?.options.map((option) => (
      <div
        key={option?._id}
        className={`p-4 rounded-lg shadow-md cursor-pointer ${selectedAnswer === option?.text ? 'bg-blue-100 border border-blue-500' : 'bg-white hover:bg-gray-100'} transition duration-300 ease-in-out`}
        onClick={() => handleAnswerSelect(option?.text)}
      >
        {option?.text}
      </div>
    ))}
  </div>
</div>
<button
  className="mt-4 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
  onClick={handleSubmitAnswer}
>
  Submit Answer
</button>

              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
