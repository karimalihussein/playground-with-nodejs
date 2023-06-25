const { send, read } = require('./internals');
function makeRequest(url, data) {
    send(url, data);
    return read();
}

const responseData = makeRequest('https://google.com', 'karim');
console.log(responseData);