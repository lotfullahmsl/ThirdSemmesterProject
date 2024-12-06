const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  // Import bcrypt

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: '127.0.0.1',     
  user: 'root',          
  password: 'Muslimwal@2004',  
  database: 'spsignup'   
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Handle sign-up requests
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email or username already exists in the database
  const checkQuery = `SELECT * FROM register WHERE email = ? OR username = ?`;
  db.query(checkQuery, [email, username], (err, result) => {
    if (err) {
      return res.status(500).send('Database error: ' + err.message);
    }

    // If user with the same email or username already exists
    if (result.length > 0) {
      window.location.href = '/index.html';
      return res.status(400).send('Email or Username already exists.');
     
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Error hashing password');
      }
      const insertQuery = `INSERT INTO register (username, email, password) VALUES (?, ?, ?)`;
      db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).send('Error: ' + err.message);
        }
        res.send('User registered successfully!');
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
