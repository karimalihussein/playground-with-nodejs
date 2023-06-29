const express = require('express');
const app = express();
const cluster = require('cluster');
const port = 3000;

function delay(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        // do nothing
    }
}

app.get('/', (req, res) => {
    res.send(`Performances example ${process.pid}`)
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`Performances example ${process.pid}`)
});
console.log('Running server.js..')
if(cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    cluster.fork();
    cluster.fork();
} else {
    console.log(`Worker ${process.pid} is running`);
    app.listen(port);
}

