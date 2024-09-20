// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = express.Router();

const app = express();

// Connect to database
connectDB();
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//   };
// Middleware 
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
// console.log(100);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));