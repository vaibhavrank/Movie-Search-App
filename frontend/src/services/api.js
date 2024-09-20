// src/services/api.js
const API_BASE_URL = 'https://movie-finder-backend-wmrr.onrender.com';
export const getRandomMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/random`);
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
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });
      console.log("take it  ",response);
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data  = await response.json();
      // console.log(data);
      localStorage.setItem('token',data.token);

      console.log("responsed verified");
      return data;
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
  };
  
  export const registerUser = async (username, email, password) => {
    try {
      console.log("Login user called");
      console.log(email,password);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token',token);
      return data;
    } catch (error) {
      console.error('Error in registerUser:', error);
      throw error;
    }
  };
  export const searchMovies = async (searchTerm) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/movies/search`);
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
  