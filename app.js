// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
const users = require('./routes/users');

// Connect to database
mongoose.connect(config.database);
// Connection log
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});
// Error log
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

// Initialize
const app = express();

//Chosen port
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/users', users); // for accessing subfiles in users

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start server
app.listen(port, () => {
    console.log('Server started on port '+port);
});
