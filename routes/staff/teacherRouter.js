const express = require("express");
const Router = express.Router();
const TeacherController = require("../../controllers/staff/TeacherController");
const IsLogin = require("../../middlewares/LoginMiddleware");
const isAdmin = require("../../middlewares/AdminMiddleware");

Router.post("/admin/register", IsLogin, isAdmin, TeacherController.register);

module.exports = Router;
