import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import TopicSelection from './pages/TopicSelection';
import Login from './pages/Login';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import AddQuestion from './pages/AddQuestion';
import Questions from './pages/Questions';
import Leaderboard from './pages/Leaderboard';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = ({ user, toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();

  const closeSidebar = () => {
    toggleSidebar(false);
  };

  return (
    <div>
      <Navbar user={user} toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} location={location} />
        <div className="lg:ml-64 p-4 w-full"> {/* Added margin-left to account for fixed sidebar */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/topics" element={<PrivateRoute><TopicSelection /></PrivateRoute>} />
            <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
            <Route path="/add-question" element={<PrivateRoute><AddQuestion /></PrivateRoute>} />
            <Route path="/questions" element={<PrivateRoute><Questions /></PrivateRoute>} />
            <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;
