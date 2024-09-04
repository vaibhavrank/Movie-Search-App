// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const getRandomMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/search`);
    if (!response.ok) {
      throw new Error('Failed to fetch random movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getRandomMovies:', error);
    throw error;
  }
};

// Add these functions to your existing api.js file

export const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
  };
  
  export const registerUser = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const token = response.token;
      return await response.json({success:true,token});
    } catch (error) {
      console.error('Error in registerUser:', error);
      throw error;
    }
  };
  export const searchMovies = async (searchTerm) => {
    try {
      const url = new URL(`${API_BASE_URL}/movies/search`);
      url.searchParams.append('s', searchTerm); // Assuming 's' is the query parameter used by the API
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
        query: JSON.stringify({searchTerm})
      });
  
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in searchMovies:', error);
      throw error;
    }
  };
  