const express = require('express');
const AcademicYearRouter = express.Router();
const AcademicYearController = require('../../controllers/academics/AcademicYearController');
const IsLogin = require('../../middlewares/LoginMiddleware');
const isAdmin = require('../../middlewares/AdminMiddleware');

AcademicYearRouter.route('/').post(IsLogin, isAdmin, AcademicYearController.createAcademicYear).get(IsLogin, isAdmin, AcademicYearController.getAcademicYears);
AcademicYearRouter.route('/:id').get(IsLogin, isAdmin, AcademicYearController.getAcademicYearById).put(IsLogin, isAdmin, AcademicYearController.updateAcademicYear).delete(IsLogin, isAdmin, AcademicYearController.deleteAcademicYear);

module.exports = AcademicYearRouter;
