function getMessages(req, res) {
    res.json("this is a message");
}

function postMessage(req, res) {
    console.log('Storing message....');
}

function getMessage(req, res) {
    console.log('Getting message....');
}

module.exports = {getMessages, postMessage, getMessage}