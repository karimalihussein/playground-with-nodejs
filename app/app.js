const express = require('express');
const morgan = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');
const AcademicYearRouter = require('../routes/academics/academicYear');
const AcademicTermRouter = require('../routes/academics/academicTerm');
const GlobalErrorHandlerMiddleware = require('../middlewares/GlobalErrorHandlerMiddleware');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // pass incoming json data to req.body

// Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', AcademicYearRouter);
app.use('/api/v1/academic-terms', AcademicTermRouter);
// Error handling
app.use(GlobalErrorHandlerMiddleware);


module.exports = app;