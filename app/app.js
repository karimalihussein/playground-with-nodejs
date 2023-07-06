const express = require('express');
const morgan = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');
const GlobalErrorHandlerMiddleware = require('../middlewares/GlobalErrorHandlerMiddleware');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // pass incoming json data to req.body

// Routes
app.use('/api/v1/admins', adminRouter);

// Error handling
app.use(GlobalErrorHandlerMiddleware);


module.exports = app;