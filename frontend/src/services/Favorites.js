// src/services/favorites.js

const API_BASE_URL = 'https://movie-finder-backend-wmrr.onrender.com';
export const addToFavorites = async (movie) => {
  

  try {
    const mail = localStorage.getItem('email');
    console.log(mail);
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/movies/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':  token, // Assuming token-based authentication
      },
      body: JSON.stringify({
        movieId: movie.imdbID, // Use the movie's imdbID to identify it
        email: mail, // Assuming you store the username in localStorage
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!data) { 
      alert(data.message);
      throw new Error(data.message || 'Failed t  o add movie to favorites');
    }else{
      alert(data.message);
    }


  } catch (error) {
    console.error('Error adding to favorites:'+ error);
    alert('Failed to add movie to favorites');
  }
};

export const getFavorites = async () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/favorites?email=${email}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      }
    });
    const data = await response.json()
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    return data.data;
  } catch (error) {
    console.error('Error in getFavorites:', error);
    throw error;
  }
};

export const removeFavorite = async (movieId) => {
  try {
    const mail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/api/movies/remove?email=${mail}&movieId=${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    

    const data = await response.json();
    alert("Data Deleted successfully");
    window.location.reload();
    return data;
  

  } catch (error) {
    alert("Movie is Not Deleted From Favorites. Please Try again!!!");
  }
};
