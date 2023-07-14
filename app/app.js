const express = require('express');
const app = express();
const TaskRouter = require('../routes/taskRouter');

// Middlewares
app.use(express.json()); 

// Routes
app.use('/api/v1/tasks', TaskRouter);

// Error handling

module.exports = app;