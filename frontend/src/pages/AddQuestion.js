import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AddQuestion = () => {
  const [topic, setTopic] = useState('Math');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (index, field, value) => {
    const newOptions = options.map((option, i) => 
      i === index ? { ...option, [field]: value } : option
    );
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/questions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`,
        },
        body: JSON.stringify({ topic, question, options, correctAnswer }),
      });

      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      const data = await response.json();
      console.log('Question added:', data);

      if (data){
        toast.success('Question added successfully');
        // Reset the fields
        setTopic('Math');
        setQuestion('');
        setOptions([{ text: '', isCorrect: false }]);
        setCorrectAnswer('');
      } else {
        toast.error('Question not added');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Error adding question');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Topic</label>
            <select 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Question</label>
            <input 
              type="text" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-bold mb-2">Option {index + 1}</label>
              <input 
                type="text" 
                value={option.text} 
                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
              <label className="inline-flex items-center mt-2">
                <input 
                  type="checkbox" 
                  checked={option.isCorrect} 
                  onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Correct Answer</span>
              </label>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addOption}
            className="w-full bg-green-500 text-white py-2 rounded-md mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Option
          </button>
          {/* correctAnswer */}
          <label className="block text-sm font-bold mb-2">Correct Answer</label>
          <input 
                type="text" 
                value={correctAnswer} 
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required 
              />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddQuestion;
