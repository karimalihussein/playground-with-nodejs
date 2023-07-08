const express = require("express");
const Router = express.Router();
const Controller = require("../../controllers/students/StudentController");
const IsLogin = require("../../middlewares/LoginMiddleware");
const IsAdmin = require("../../middlewares/AdminMiddleware");
const StudentMiddleware = require("../../middlewares/StudentMiddleware");
Router.get("/profile",  StudentMiddleware.isStudentLoggedIn, StudentMiddleware.isStudent, Controller.getYourOwnProfile);
// Router.put("/profile", TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.updateTeacherProfile);
Router.post("/admin/register", IsLogin, IsAdmin, Controller.register);
Router.post("/login", Controller.login);
Router.get("/", IsLogin, IsAdmin, Controller.index);
Router.get("/:id", IsLogin, IsAdmin, Controller.show);
// Router.put("/:id", IsLogin, isAdmin, TeacherController.adminUpdateTeacherProfile);

module.exports = Router;
