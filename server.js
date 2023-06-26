const express = require('express');
const app = express();
const port = 3000;
const friends = [
{
    id: 1,
    name: 'John Doe',
},{
    id: 2,
    name: 'Jane Doe',
},{
    id: 3,
    name: 'John Smith',
},
{
    id: 4,
    name: 'Jane Smith',
},
{
    id: 5,
    name: 'Florin Pop',
},{
    id: 6,
    name: 'Vladimir Putin',
}
];


app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/friends', (req, res) => {
    res.send(friends)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); 
