const express = require("express");
const Router = express.Router();
const TeacherController = require("../../controllers/staff/TeacherController");
const IsLogin = require("../../middlewares/LoginMiddleware");
const isAdmin = require("../../middlewares/AdminMiddleware");
const TeacherMiddleware = require("../../middlewares/TeacherMiddleware");
Router.post("/admin/register", IsLogin, isAdmin, TeacherController.register);
Router.post("/login", TeacherController.login);
Router.get("/", TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.index);

module.exports = Router;
