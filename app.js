const express = require('express');
const app = express();
const courses = require('./routes/courses');
const instructors = require('./routes/instructors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydb').then(() => console.log('Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/instructors', instructors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});