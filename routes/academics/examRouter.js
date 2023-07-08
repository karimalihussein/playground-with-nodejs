const express = require('express');
const Router = express.Router();
const Controller = require('../../controllers/academics/ExamController');
const TeacherMiddleware = require("../../middlewares/TeacherMiddleware");

Router.route('/').post(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.store).get(TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, Controller.index);

module.exports = Router;
