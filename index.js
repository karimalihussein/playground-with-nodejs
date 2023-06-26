const http = require('http');
const PORT = 3000;
const friends = [
{
    id: 1,
    name: 'John Doe'
},
{
    id: 2,
    name: 'Bob Doe'
},
{
    id: 3,
    name: 'Shannon Doe'
}
];
const server = http.createServer((req, res) => {

    const { headers, url, method } = req;
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();
        let status = 404;
        const response = {
            success: false,
            data: null,
            error: null
        };
        if (method === 'GET' && url === '/friends') {
            status = 200;
            response.success = true;
            response.data = friends;
        } else if (method === 'POST' && url === '/friends') {
            const { id, name } = JSON.parse(body);
            if (!id || !name) {
                status = 400;
                response.error = 'Please add id and name values';
            } else {
                friends.push({ id, name });
                status = 201;
                response.success = true;
                response.data = friends;
            }
        }
        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        });
        res.end(JSON.stringify(response));
    });
   
});

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});