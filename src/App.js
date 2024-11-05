import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import OnePiece from './components/OnePiece';

const App = () => {
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowChat(false);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} onChatToggle={toggleChat} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/todos" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/todos" /> : <Register />} />
        <Route path="/todos" element={user ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile username={user.username} /> : <Navigate to="/login" />} />
        <Route path="/onepiece" element={<OnePiece />} />
      </Routes>
    </Router>
  );
};

export default App;