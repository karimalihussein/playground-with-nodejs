"use strict";

var AysncHandler = require("express-async-handler");

var AcademicYear = require("../../models/Academic/AcademicYear");

var Admin = require("../../models/Staff/Admin");

var createAcademicYear = AysncHandler(function _callee(req, res) {
  var _req$body, name, fromYear, toYear, academicYear, academicYearCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, fromYear = _req$body.fromYear, toYear = _req$body.toYear; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(AcademicYear.findOne({
            name: name
          }));

        case 3:
          academicYear = _context.sent;

          if (!academicYear) {
            _context.next = 6;
            break;
          }

          throw new Error("Academic year already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(AcademicYear.create({
            name: name,
            fromYear: fromYear,
            toYear: toYear,
            createdBy: req.userAuth._id
          }));

        case 8:
          academicYearCreated = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;
          admin.academicYears.push(academicYearCreated._id);
          _context.next = 15;
          return regeneratorRuntime.awrap(admin.save());

        case 15:
          res.status(201).json({
            status: "success",
            message: "Academic year created successfully",
            data: academicYearCreated
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
var getAcademicYears = AysncHandler(function _callee2(req, res) {
  var academicYears;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(AcademicYear.find());

        case 2:
          academicYears = _context2.sent;
          res.status(200).json({
            status: "success",
            message: "Academic years fetched successfully",
            data: academicYears
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getAcademicYearById = AysncHandler(function _callee3(req, res) {
  var id, academicYear;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(AcademicYear.findById(id));

        case 3:
          academicYear = _context3.sent;

          if (academicYear) {
            _context3.next = 6;
            break;
          }

          throw new Error("Academic year not found");

        case 6:
          res.status(200).json({
            status: "success",
            message: "Academic year fetched successfully",
            data: academicYear
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var updateAcademicYear = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, fromYear, toYear, id, academicYearExists, academicYear;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, fromYear = _req$body2.fromYear, toYear = _req$body2.toYear;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(AcademicYear.findOne({
            name: name
          }));

        case 4:
          academicYearExists = _context4.sent;

          if (!(academicYearExists && academicYearExists._id != id)) {
            _context4.next = 7;
            break;
          }

          throw new Error("Academic year already exists");

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(AcademicYear.findByIdAndUpdate(id, {
            name: name,
            fromYear: fromYear,
            toYear: toYear
          }, {
            "new": true
          }));

        case 9:
          academicYear = _context4.sent;

          if (academicYear) {
            _context4.next = 12;
            break;
          }

          throw new Error("Academic year not found");

        case 12:
          ;
          res.status(200).json({
            status: "success",
            message: "Academic year updated successfully",
            data: academicYear
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var deleteAcademicYear = AysncHandler(function _callee5(req, res) {
  var id, academicYear;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(AcademicYear.findByIdAndDelete(id));

        case 3:
          academicYear = _context5.sent;

          if (academicYear) {
            _context5.next = 6;
            break;
          }

          throw new Error("Academic year not found");

        case 6:
          res.status(200).json({
            status: "success",
            message: "Academic year deleted successfully",
            data: academicYear
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  createAcademicYear: createAcademicYear,
  getAcademicYears: getAcademicYears,
  getAcademicYearById: getAcademicYearById,
  updateAcademicYear: updateAcademicYear,
  deleteAcademicYear: deleteAcademicYear
};