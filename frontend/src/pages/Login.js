import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { loginUser } from '../services/api';
import '../styles/Auth.css';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // console.log("Login button working");
      const response = await loginUser(email, password);
      // console.log(response);
      // localStorage.setItem('token', response.email);
      localStorage.setItem('email',response.email);
      // console.log(localStorage.getItem('email'));
      setSuccess("Registration successful! Redirecting to login page...");

      setTimeout(() => {
        history('/');
      }, 2000);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h2>Login</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        )}
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;