const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'HI From Json' }));
});

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});