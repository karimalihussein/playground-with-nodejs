const express = require('express');
const Router = express.Router();
const Controller = require('../../controllers/academics/QuestionController');
const TeacherMiddleware = require('../../middlewares/TeacherMiddleware');

Router.route('/:examId').post(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.store);
Router.route('/').get(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.index);
// Router.route('/:id').get(IsLogin, isAdmin, Controller.show).put(IsLogin, isAdmin, Controller.update).delete(IsLogin, isAdmin, Controller.destroy);

module.exports = Router;
