"use strict";

var AysncHandler = require("express-async-handler");

var ClassLevel = require("../../models/Academic/ClassLevel");

var Admin = require("../../models/Staff/Admin");

var store = AysncHandler(function _callee(req, res) {
  var _req$body, name, description, classFound, classCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description;
          _context.next = 3;
          return regeneratorRuntime.awrap(ClassLevel.findOne({
            name: name
          }));

        case 3:
          classFound = _context.sent;

          if (!classFound) {
            _context.next = 6;
            break;
          }

          throw new Error("Class already exists");

        case 6:
          ;
          _context.next = 9;
          return regeneratorRuntime.awrap(ClassLevel.create({
            name: name,
            description: description,
            createdBy: req.userAuth._id
          }));

        case 9:
          classCreated = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 12:
          admin = _context.sent;
          admin.classLevels.push(classCreated._id);
          _context.next = 16;
          return regeneratorRuntime.awrap(admin.save());

        case 16:
          res.status(201).json({
            status: "success",
            message: "Class created successfully",
            data: classCreated
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});
var index = AysncHandler(function _callee2(req, res) {
  var classes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(ClassLevel.find().select("-__v -createdAt -updatedAt").populate("createdBy", "name"));

        case 2:
          classes = _context2.sent;
          res.status(200).json({
            status: "success",
            message: "Classes fetched successfully",
            data: classes
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var show = AysncHandler(function _callee3(req, res) {
  var id, classFound;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(ClassLevel.findById(id).select("-__v -createdAt -updatedAt").populate("createdBy", "name"));

        case 3:
          classFound = _context3.sent;

          if (classFound) {
            _context3.next = 6;
            break;
          }

          throw new Error("Class not found");

        case 6:
          ;
          res.status(200).json({
            status: "success",
            message: "Class fetched successfully",
            data: classFound
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var update = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, description, id, classFound, classUpdated;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(ClassLevel.findOne({
            name: name
          }));

        case 4:
          classFound = _context4.sent;

          if (!(classFound && classFound._id != id)) {
            _context4.next = 7;
            break;
          }

          throw new Error("Class already exists");

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(ClassLevel.findByIdAndUpdate(id, {
            name: name,
            description: description,
            updatedBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 9:
          classUpdated = _context4.sent;
          res.status(200).json({
            status: "success",
            message: "Class updated successfully",
            data: classUpdated
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var destroy = AysncHandler(function _callee5(req, res) {
  var id, classDeleted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(ClassLevel.findByIdAndDelete(id));

        case 3:
          classDeleted = _context5.sent;

          if (classDeleted) {
            _context5.next = 6;
            break;
          }

          throw new Error("Class not found");

        case 6:
          res.status(200).json({
            status: "success",
            message: "Class deleted successfully",
            data: classDeleted
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