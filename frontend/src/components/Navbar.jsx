import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-xl">Quiz Application</div>
      {/* Hamburger Menu for Mobile View */}
      <div className="lg:hidden cursor-pointer" onClick={toggleSidebar}>
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </div>
      {/* Desktop View */}
      <div className="hidden lg:flex items-center">
        {location.pathname === '/login' ? (
          <Link to="/register" className="text-white mr-4">Register</Link>
        ) : location.pathname === '/register' ? (
          <Link to="/login" className="text-white mr-4">Login</Link>
        ) : (
          <>
            {user ? (
              <>
                <span className="text-white mr-4">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white mr-4">Login</Link>
                <Link to="/register" className="text-white">Register</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
