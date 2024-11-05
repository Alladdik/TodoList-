import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import OnePiece from './components/OnePiece';
import Assistant from './components/Assistant';

const App = () => {
  const [user, setUser] = useState(null);

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
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<TodoList isAuthenticated={!!user} />} />
          {user && <Route path="/profile" element={<Profile username={user.username} />} />}
          <Route path="/onepiece" element={<OnePiece />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
        <Assistant />
      </div>
    </Router>
  );
};

export default App;