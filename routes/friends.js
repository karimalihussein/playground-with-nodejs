const express = require('express');
const friendsController = require('../controllers/friendsController');

const friendsRouter = express.Router();
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:id', friendsController.getFriend);
friendsRouter.post('/', friendsController.postFriend);


module.exports = friendsRouter;