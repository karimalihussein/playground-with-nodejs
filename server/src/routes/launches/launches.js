const express = require('express');
const LaunchesRouter = express.Router();
const { httpGetAllLaunches, httpAddNewLaunch } = require('../../controllers/LaunchesController');
LaunchesRouter.get('/launches', httpGetAllLaunches);
LaunchesRouter.post('/launches', httpAddNewLaunch);

module.exports = LaunchesRouter;
