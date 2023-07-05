
const http = require('http');
const app = require('./app/app');

const PORT = process.env.PORT || 3000;

//====Middleware====
// app.use(morgan('dev'));

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


