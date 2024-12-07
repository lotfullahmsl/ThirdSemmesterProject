const express = require('express');
const mysql = require('mysql'); 
const app = express();


const port = 3002;

// Set up MySQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Muslimwal@2004',
    database: 'spsignup', 
});

// Database connection
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Middleware to parse JSON requests
app.use(express.json());

// Insert predefined topics into the 'topics' table
app.post('/insert-topics', async (req, res) => {
    const topics = [
        { topic_name: 'web-development' },
        { topic_name: 'dsa' },
        { topic_name: 'mobile-development' }
    ];

    const query = 'INSERT INTO topics (topic_name) VALUES ?';

    // Format data as array of arrays for multiple inserts
    const values = topics.map(topic => [topic.topic_name]);

    try {
        // Execute the insert query with multiple values at once
        connection.query(query, [values], (err, result) => {
            if (err) {
                console.error('Error inserting topics:', err);
                return res.status(500).send('Error inserting topics');
            }
            console.log('Topics inserted successfully');
            res.send('Topics inserted successfully');
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error inserting topics');
    }
});

// Endpoint to fetch topics for the dropdown
app.get('/get-topics', (req, res) => {
    const query = 'SELECT * FROM topics';
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching topics');
        }
        res.json(results); // Return the topics as JSON
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
