const express = require('express');
const friendsController = require('./controllers/friendsController');
const messagesController = require('./controllers/messagesController');
const app = express();
const port = 3000;


app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/friends', friendsController.getFriends);
app.get('/friends/:id', friendsController.getFriend);
app.post('/friends', friendsController.postFriend);
app.get('/messages', messagesController.getMessages);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); 
