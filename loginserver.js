const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Use a different port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Configuration
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Muslimwal@2004',
    database: 'spsignup',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM register WHERE username = ?`;
    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }

        if (result.length === 0) {
            return res.status(400).send('Invalid username or password.');
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing passwords.');
            }

            if (isMatch) {
                res.send('Login successful! Welcome back.');
                
                
            } else {
                res.status(400).send('Invalid username or password.');
            }
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Login server is running at http://localhost:${port}`);
});
