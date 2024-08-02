import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/scores/leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data);
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Network error');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-3/4 lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Leaderboard</h1>
        {error && <p className="text-red-500">{error}</p>}
        {leaderboard.length === 0 && <p>No scores available.</p>}
        {leaderboard.map((user, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">{user.name}</p>
            <p>Best Score: {user.bestScore}</p>
            <ul>
              {user.scores.map((score, idx) => (
                <li key={idx}>{score.topic}: {score.score}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
