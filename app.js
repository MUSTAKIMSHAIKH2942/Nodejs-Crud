const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');

app.use(express.static(path.join(__dirname, 'views')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
  
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
  
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });
  
//     const data = await response.json();
  
//     if (response.ok) {
//       localStorage.setItem('token', data.token);
//       window.location.href = '/dashboard';
//     } else {
//       alert(data.msg);
//     }
//   });