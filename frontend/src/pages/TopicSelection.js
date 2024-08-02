import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';

const TopicSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const topics = ['Math', 'Science', 'History', 'Geography'];

  const handleTopicChange = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      toast.error('Please login to select topics.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/topics/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          topics: selectedTopics,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('selectedTopics', JSON.stringify(selectedTopics));
        navigate('/quiz');
        console.log('Selected Topics:', data.selectedTopics);
      } else {
        const data = await response.json();
        console.error('Error:', data.error);
        toast.error('Failed to select topics. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Select Topics</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={topic}
                    checked={selectedTopics.includes(topic)}
                    onChange={() => handleTopicChange(topic)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{topic}</span>
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TopicSelection;
