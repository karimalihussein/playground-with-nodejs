const path = require('path');
const express = require('express');
const app = express();
const rootDir = require('./util/path');
const ErorController = require('./controllers/ErrorController');

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const adminRoutes = require('./routes/admin');
app.use(adminRoutes.routes);

app.use(ErorController.get404);

app.listen(3000);