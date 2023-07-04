const express = require('express');
const app = express();
const courses = require('./routes/courses');
const instructors = require('./routes/instructors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/instructors', instructors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${port}...`);
});