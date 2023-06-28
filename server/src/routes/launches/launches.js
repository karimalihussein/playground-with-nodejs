const express = require('express');
const LaunchesRouter = express.Router();
const { getAllLaunches } = require('../../controllers/LaunchesController');
LaunchesRouter.get('/launches', getAllLaunches);

module.exports = LaunchesRouter;
