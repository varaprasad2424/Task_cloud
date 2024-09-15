const express = require('express');
const mysql = require('mysql2');

const app = express();

// Set up the MySQL connection
const db = mysql.createConnection({
  host: '172.19.0.2',
  user: 'vara',
  password: 'vara2424',
  database: 'your_database',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Test endpoint to fetch all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed');
    }
    res.json(results);
  });
});

// Test endpoint to fetch a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(results[0]);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

