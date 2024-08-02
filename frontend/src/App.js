import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <AppRoutes user={user} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </Router>
  );
};

export default App;
