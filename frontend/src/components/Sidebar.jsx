import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div
      className={`bg-gray-800 text-white p-4 fixed top-0 h-full w-64 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex justify-end lg:hidden">
        <button onClick={toggleSidebar} className="text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="flex flex-col space-y-2 mt-20 w-[90%]">
        {location.pathname !== '/login' && location.pathname !== '/register' && (
          <>
            <Link to="/quiz" className="p-2 bg-gray-700 rounded">
              Take Quiz
            </Link>
            <Link to="/leaderboard" className="p-2 bg-gray-700 rounded">
              Leaderboard
            </Link>
            <Link to="/add-question" className="p-2 bg-gray-700 rounded">
              Add Question
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 rounded text-center mt-4"
              >
                Logout
              </button>
            )}
          </>
        )}
        {location.pathname === '/login' && (
          <Link to="/register" className="p-2 bg-gray-700 rounded">
            Register
          </Link>
        )}
        {location.pathname === '/register' && (
          <Link to="/login" className="p-2 bg-gray-700 rounded">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
