import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { searchMovies } from '../services/api';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');
  const history = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    history('/');
    onSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MovieApp</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        {isLoggedIn ? (
          < >
            <Link to="/favorites" className="navbar-item color-3">Favorites</Link>
            <Link to="/" onClick={handleLogout} className="navbar-item">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/signup" className="navbar-item">Sign Up</Link>
          </>
        )}
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='search' >Search</button>
      </form>
    </nav>
  );
};

export default Navbar;