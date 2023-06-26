const express = require('express');
const friendsRouter = require('./routes/friends');
const messagesRouter = require('./routes/messages');
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


app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); 

