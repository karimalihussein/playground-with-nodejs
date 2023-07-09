const express = require('express');
const router = express.Router();
const Controller = require('../controllers/TasksController');

router.route('/').get(Controller.index);

module.exports = router;