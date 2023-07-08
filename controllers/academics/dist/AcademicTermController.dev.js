"use strict";

var AysncHandler = require("express-async-handler");

var AcademicTerm = require("../../models/Academic/AcademicTerm");

var Admin = require("../../models/Staff/Admin");

var store = AysncHandler(function _callee(req, res) {
  var _req$body, name, description, duration, academicTerm, academicTermCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, duration = _req$body.duration; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(AcademicTerm.findOne({
            name: name
          }));

        case 3:
          academicTerm = _context.sent;

          if (!academicTerm) {
            _context.next = 6;
            break;
          }

          throw new Error("Academic Term already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(AcademicTerm.create({
            name: name,
            description: description,
            duration: duration,
            createdBy: req.userAuth._id
          }));

        case 8:
          academicTermCreated = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;
          admin.academicTerms.push(academicTermCreated._id);
          _context.next = 15;
          return regeneratorRuntime.awrap(admin.save());

        case 15:
          res.status(201).json({
            status: "success",
            message: "Academic term created successfully",
            data: academicTermCreated
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
var index = AysncHandler(function _callee2(req, res) {
  var academicTerms;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(AcademicTerm.find().select("-__v -createdAt -updatedAt").populate("createdBy", "name"));

        case 2:
          academicTerms = _context2.sent;
          res.status(200).json({
            status: "success",
            message: "Academic terms fetched successfully",
            data: academicTerms
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var show = AysncHandler(function _callee3(req, res) {
  var id, academicTerm;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(AcademicTerm.findById(id).select("-__v -createdAt -updatedAt").populate("createdBy", "name"));

        case 3:
          academicTerm = _context3.sent;

          if (academicTerm) {
            _context3.next = 6;
            break;
          }

          throw new Error("Academic term not found");

        case 6:
          res.status(200).json({
            status: "success",
            message: "Academic term fetched successfully",
            data: academicTerm
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var update = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, fromterm, toterm, id, academicTermExists, academicTerm;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, fromterm = _req$body2.fromterm, toterm = _req$body2.toterm;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(AcademicTerm.findOne({
            name: name
          }));

        case 4:
          academicTermExists = _context4.sent;

          if (!(academicTermExists && academicTermExists._id != id)) {
            _context4.next = 7;
            break;
          }

          throw new Error("Academic term already exists");

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(AcademicTerm.findByIdAndUpdate(id, {
            name: name,
            fromterm: fromterm,
            toterm: toterm
          }, {
            "new": true
          }));

        case 9:
          academicTerm = _context4.sent;

          if (academicTerm) {
            _context4.next = 12;
            break;
          }

          throw new Error("Academic term not found");

        case 12:
          ;
          res.status(200).json({
            status: "success",
            message: "Academic term updated successfully",
            data: academicTerm
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var destroy = AysncHandler(function _callee5(req, res) {
  var id, academicTerm;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(AcademicTerm.findByIdAndDelete(id));

        case 3:
          academicTerm = _context5.sent;

          if (academicTerm) {
            _context5.next = 6;
            break;
          }

          throw new Error("Academic term not found");

        case 6:
          res.status(200).json({
            status: "success",
            message: "Academic term deleted successfully",
            data: academicTerm
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  store: store,
  index: index,
  show: show,
  update: update,
  destroy: destroy
};