const path = require('path');
const express = require('express');
const app = express();
const rootDir = require('./util/path');


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const adminRoutes = require('./routes/admin');
app.use(adminRoutes.routes);



app.listen(3000);