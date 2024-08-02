// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = '/api/users/';

const register = async (name, email, password) => {
  const response = await axios.post('http://localhost:8000/api/users/' + 'register', { name, email, password });
  if (response.data) {
    console.log("regiter", response);
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};




const login = async (email, password) => {
  const response = await axios.post("http://localhost:8000/api/users/" + 'login', { email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('userInfo');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
