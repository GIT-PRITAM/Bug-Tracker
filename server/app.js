const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);        // register/login
app.use('/api/projects', projectRoutes); // project 
app.use('/api/issues', issueRoutes);     // issue 

module.exports = app;
