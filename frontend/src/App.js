import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './styles/global.css';
import MainHeader from './components/MainHeader';
import Favorites from './pages/Favorites';
import NotFound from './pages/notfound';
function App() {
  return (
    

        <div className="App">
          
          
          <Routes>
            <Route path="/" element={<MainHeader/>} />
            <Route index  element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    // </div>
    
  );
}

export default App;