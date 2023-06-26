const express = require('express');
const messagesController = require('../controllers/messagesController');

const messagesRouter = express.Router();
messagesRouter.get('/', messagesController.getMessages);
messagesRouter.get('/:id', messagesController.getMessage);
messagesRouter.post('/', messagesController.postMessage);

module.exports = messagesRouter;