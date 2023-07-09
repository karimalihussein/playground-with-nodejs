const express = require('express');
const Router = express.Router();
const Controller = require('../../controllers/academics/QuestionController');
const TeacherMiddleware = require('../../middlewares/TeacherMiddleware');

Router.route('/:examId').post(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.store);
Router.route('/').get(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.index);
Router.route('/:id').get(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.show);
Router.route('/:id').put(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.update);
Router.route('/:id').delete(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.destroy);

module.exports = Router;
