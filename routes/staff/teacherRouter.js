const express = require("express");
const Router = express.Router();
const TeacherController = require("../../controllers/staff/TeacherController");
const IsLogin = require("../../middlewares/LoginMiddleware");
const isAdmin = require("../../middlewares/AdminMiddleware");
const TeacherMiddleware = require("../../middlewares/TeacherMiddleware");
Router.get("/profile",  TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.getTeacherProfile);
Router.put("/profile", TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.updateTeacherProfile);
Router.post("/admin/register", IsLogin, isAdmin, TeacherController.register);
Router.post("/login", TeacherController.login);
Router.get("/", TeacherMiddleware.isTeacherLoggedIn, TeacherMiddleware.isTeacher, TeacherController.index);
Router.get("/:id", IsLogin, isAdmin, TeacherController.show);

module.exports = Router;
