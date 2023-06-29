const express = require('express');
const app = express();
const port = 3000;

function delay(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        // do nothing
    }
}

app.get('/', (req, res) => {
    res.send("Performance exmaple");
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send('Timer');
});

app.listen(port, () => {});