const express = require('express');
const PlanetsRouter = express.Router();
const { getAllPlanets } = require('../../controllers/PlanetsController');
PlanetsRouter.get('/planets', getAllPlanets);

module.exports = PlanetsRouter;