const express = require('express');
const app = express();
const cluster = require('cluster');
const port = 3000;
const os = require('os');

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
    const NUM_workers = os.cpus().length;
    for (let i = 0; i < NUM_workers; i++) {
        cluster.fork();
    }
} else {
    console.log(`Worker ${process.pid} is running`);
    app.listen(port);
}

