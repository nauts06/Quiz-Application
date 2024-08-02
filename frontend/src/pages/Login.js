import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the validation schema with yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Wrong password or email.');
      } else if (error.message === 'Network Error') {
        toast.error('Network Error');
      } else {
        toast.error('Login Failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-auto">
        {/* Left side image */}
        <div className="md:w-1/2 hidden md:block bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-white text-4xl md:text-3xl font-bold p-4">Welcome to Quiz App</h1>
          </div>
        </div>

        {/* Right side for login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full p-2 border border-gray-300 rounded-lg ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                {...register('password')}
                className={`w-full p-2 border border-gray-300 rounded-lg ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            
          </form>
      
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
