function getMessages(req, res) {
    res.json("this is a message");
}

function postMessage(req, res) {
    console.log('Storing message....');
}

module.exports = {getMessages, postMessage}