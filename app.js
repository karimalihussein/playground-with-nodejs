const path = require('path');
const express = require('express');
const app = express();
const rootDir = require('./util/path');
const ErorController = require('./controllers/ErrorController');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const adminRoutes = require('./routes/admin');
app.use(adminRoutes.routes);

app.use(ErorController.get404);

app.listen(3000);