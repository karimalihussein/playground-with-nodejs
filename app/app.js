const express = require('express');
const morgan = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');
const AcademicYearRouter = require('../routes/academics/academicYear');
const AcademicTermRouter = require('../routes/academics/academicTerm');
const ClassLevelRouter = require('../routes/academics/classLevel');
const ProgramRouter = require('../routes/academics/program');
const SubjectRouter = require('../routes/academics/subject');
const GlobalErrorHandlerMiddleware = require('../middlewares/GlobalErrorHandlerMiddleware');
const Subject = require('../models/Academic/Subject');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // pass incoming json data to req.body

// Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', AcademicYearRouter);
app.use('/api/v1/academic-terms', AcademicTermRouter);
app.use('/api/v1/class-levels', ClassLevelRouter);
app.use('/api/v1/programs', ProgramRouter);
app.use('/api/v1/subjects', SubjectRouter);
// Error handling
app.use(GlobalErrorHandlerMiddleware);


module.exports = app;