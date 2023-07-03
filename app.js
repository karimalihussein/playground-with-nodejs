const express = require('express');
const app = express();
const courses = require('./routes/courses');
const instructors = require('./routes/instructors');

app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/instructors', instructors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});