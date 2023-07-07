const express = require('express');
const Router = express.Router();
const Controller = require('../../controllers/academics/AcademicTermController');
const IsLogin = require('../../middlewares/LoginMiddleware');
const isAdmin = require('../../middlewares/AdminMiddleware');

Router.route('/').post(IsLogin, isAdmin, Controller.store).get(IsLogin, isAdmin, Controller.index);
Router.route('/:id').get(IsLogin, isAdmin, Controller.show).put(IsLogin, isAdmin, Controller.update).delete(IsLogin, isAdmin, Controller.destory);

module.exports = Router;
