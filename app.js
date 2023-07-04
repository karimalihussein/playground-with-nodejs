const express = require('express');
const app = express();
const courses = require('./routes/courses');
const instructors = require('./routes/instructors');
require('dotenv').config();
const logger = require('./middlewares/LoggerMiddleware');
const ErrorsMiddleware = require('./middlewares/ErrorsMiddleware');
const auth = require('./routes/auth');
const users = require('./routes/users');
const connectToDB = require('./config/db');

connectToDB();

app.use(express.json());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/instructors', instructors);
app.use('/api/auth', auth)
app.use('/api/users', users);
app.use(ErrorsMiddleware.notFound);
app.use(ErrorsMiddleware.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${port}...`);
});