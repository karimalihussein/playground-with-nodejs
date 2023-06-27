const express = require('express');
const friendsRouter = require('./routes/friends');
const messagesRouter = require('./routes/messages');
const app = express();
const port = 3000;
const path = require('path');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());
app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());




app.get('/', (req, res) => {
    res.render('index',{
        title: 'Home Page',
        caption: 'Welcome to my page!'
    });
});
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); 

