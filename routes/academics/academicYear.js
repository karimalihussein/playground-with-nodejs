const express = require('express');
const AcademicYearRouter = express.Router();
const AcademicYearController = require('../../controllers/academics/AcademicYearController');
const IsLogin = require('../../middlewares/LoginMiddleware');
const isAdmin = require('../../middlewares/AdminMiddleware');

AcademicYearRouter.post('/', IsLogin, isAdmin, AcademicYearController.createAcademicYear);


module.exports = AcademicYearRouter;
