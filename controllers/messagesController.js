const path = require('path');

function getMessages(req, res) {
    const file = path.join(__dirname, '..' ,'public', 'images', '123.jpg');
    res.sendFile(file);
}

function postMessage(req, res) {
    console.log('Storing message....');
}

function getMessage(req, res) {
    console.log('Getting message....');
}

module.exports = {getMessages, postMessage, getMessage}