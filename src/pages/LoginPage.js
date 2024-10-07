import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login, loading } = useContext(AuthContext); // Access user, login, and loading from AuthContext

  useEffect(() => {
    // Redirect to home page if user is already logged in
    if (!loading && user) {
      navigate('/');
    }
  }, [user, navigate, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        usuario: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle successful login here
      console.log('Login successful:', response.data);

      // Save the user data in the context
      login(response.data);

      // Redirect to home page
      navigate('/');
    } catch (error) {
      if (error.response) {
        // Handle error response
        setError('Login failed: ' + (error.response.data.detail || 'Unknown error'));
      } else {
        // Handle error request
        setError('Error: ' + error.message);
      }
    }
  };

  if (loading) {
    // Show a loading spinner or nothing while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#8B0000] h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:w-7/12 w-8/12 shadow-3xl rounded-xl relative">
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
          <path d="M12 2a5 5 0 015 5v3h1.75a1.25 1.25 0 011.25 1.25v9.5a1.25 1.25 0 01-1.25 1.25H5.25A1.25 1.25 0 014 20.75v-9.5A1.25 1.25 0 015.25 10H7V7a5 5 0 015-5zm3 8V7a3 3 0 00-6 0v3h6zM5.5 19h13v-7.5h-13V19z"></path>
          </svg>
        </div>
        <form onSubmit={handleSubmit} className="p-12 md:p-24">
          <h2 className="text-2xl font-semibold mb-6 text-center">Inicio de sesión</h2>
          <div className="relative flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Username"
            />
          </div>
          <div className="relative flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
            </svg>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;