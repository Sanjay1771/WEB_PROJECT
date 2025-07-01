import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import todoImage from '../todo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2>TODO LIST</h2>
        <p>Please enter your details</p>

        <form onSubmit={handleLogin}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember for 30 days
            </label>
            <Link to="/forgot-password">Forgot password</Link>
          </div>

          <button type="submit" className="login-btn">Sign in</button>

          <button type="button" className="google-btn">
            <a
  href="http://localhost:5000/auth/google"
  className="google-btn"
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    padding: '10px 16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    backgroundColor: '#fff',
    color: '#000'
  }}
>
  <img
    src="https://img.icons8.com/color/16/000000/google-logo.png"
    alt="Google"
  />
  Sign in with Google
</a>

          </button>
        </form>

      </div>

      <div className="login-right">
        <img
        src={todoImage}
        alt="Support"
        />

      </div>
    </div>
  );
};

export default LoginPage;
