const express = require("express");
const Router = express.Router();
const Controller = require("../../controllers/students/StudentController");
const IsLogin = require("../../middlewares/LoginMiddleware");
const isAdmin = require("../../middlewares/AdminMiddleware");
const TeacherMiddleware = require("../../middlewares/TeacherMiddleware");
// Router.get("/profile",  TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.getTeacherProfile);
// Router.put("/profile", TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.updateTeacherProfile);
Router.post("/admin/register", IsLogin, isAdmin, Controller.register);
Router.post("/login", Controller.login);
// Router.get("/", TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.index);
// Router.get("/:id", IsLogin, isAdmin, TeacherController.show);
// Router.put("/:id", IsLogin, isAdmin, TeacherController.adminUpdateTeacherProfile);

module.exports = Router;
