import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];

    const createParticle = (x, y) => {
      const hue = Math.random() * 360;
      particles.push({
        x,
        y,
        hue,
        radius: Math.random() * 15 + 5,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        life: 100,
      });
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.life / 100})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    const handleMouseMove = (e) => {
      createParticle(e.clientX, e.clientY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    updateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const { token } = response.data;

      setUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
      localStorage.setItem('token', token);

      window.location.href = '/todos';
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="auth-content">
        <h1 className="title">Login to Todo App</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="buttons">
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </form>
      </div>
      <footer className="developer-info">
        <div className="developer-info-content">
          <p>
            by alladdiks |{' '}
            <a href="https://github.com/Alladdik" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login; 