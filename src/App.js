import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust path as needed



function App() {
  return (
    <AuthProvider> {/* Wrap your app in AuthProvider */}

    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />

        </Routes>
      </div>
    </Router>
    </AuthProvider>

  );
}

export default App;
