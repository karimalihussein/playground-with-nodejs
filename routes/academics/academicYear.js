const express = require('express');
const AcademicYearRouter = express.Router();
const AcademicYearController = require('../../controllers/academics/AcademicYearController');
const IsLogin = require('../../middlewares/LoginMiddleware');
const isAdmin = require('../../middlewares/AdminMiddleware');

AcademicYearRouter.post('/', IsLogin, isAdmin, AcademicYearController.createAcademicYear);
AcademicYearRouter.get('/', IsLogin, isAdmin, AcademicYearController.getAcademicYears);
AcademicYearRouter.get('/:id', IsLogin, isAdmin, AcademicYearController.getAcademicYearById);
AcademicYearRouter.put('/:id', IsLogin, isAdmin, AcademicYearController.updateAcademicYear);
AcademicYearRouter.delete('/:id', IsLogin, isAdmin, AcademicYearController.deleteAcademicYear);

module.exports = AcademicYearRouter;
