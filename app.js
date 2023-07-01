const http = require('http');
const express = require('express');
const adminRoutes = require('./routes/admin');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(adminRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);