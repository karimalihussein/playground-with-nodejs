const express = require("express");
const adminRouter = express.Router();
const AdminController = require("../../controllers/staff/AdminController");
const AuthController = require("../../controllers/staff/AuthController");
const IsLogin = require("../../middlewares/LoginMiddleware");
const isAdmin = require("../../middlewares/AdminMiddleware");

adminRouter.post("/register", AuthController.registerAdmin);
adminRouter.post("/login", AuthController.loginAdmin);
adminRouter.post("/", AdminController.getAllAdmins);
adminRouter.get("/", IsLogin, isAdmin, AdminController.getAllAdmins);
// adminRouter.get("/:id", IsLogin, AdminController.getAdminById);
adminRouter.put("/:id", AdminController.updateAdmin);
adminRouter.delete("/:id", AdminController.deleteAdmin);
adminRouter.put("/suspend/teacher/:id", AdminController.suspendTeacher);
adminRouter.put("/unsuspend/teacher/:id", AdminController.unsuspendTeacher);
adminRouter.put("/withdraw/teacher/:id", AdminController.withdrawTeacher);
adminRouter.put("/unwithdraw/teacher/:id", AdminController.unwithdrawTeacher);
adminRouter.get("/profile", IsLogin, AdminController.adminProfile);

module.exports = adminRouter;
