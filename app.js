const express = require('express');
const app = express();
const port = 3000;
const taskRouter = require('./routes/taskRouter');

// middlewares 
app.use(express.json());

// routes
app.use('/api/v1/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});