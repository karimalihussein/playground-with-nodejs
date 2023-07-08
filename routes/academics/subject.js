const express = require('express');
const Router = express.Router();
const Controller = require('../../controllers/academics/SubjectController');
const IsLogin = require('../../middlewares/LoginMiddleware');
const isAdmin = require('../../middlewares/AdminMiddleware');


Router.post('/:programId', IsLogin, isAdmin, Controller.store);
Router.get('/', IsLogin, isAdmin, Controller.index);
Router.get('/:id', IsLogin, isAdmin, Controller.show);
Router.put('/:id', IsLogin, isAdmin, Controller.update);
Router.delete('/:id', IsLogin, isAdmin, Controller.destroy);
module.exports = Router;
