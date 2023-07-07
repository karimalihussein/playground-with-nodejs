const AysncHandler = require("express-async-handler");
const AcademicYear = require("../../models/Academic/AcademicYear");
const Admin = require("../../models/Staff/Admin");

const createAcademicYear = AysncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;
    //check if exists
    const academicYear = await AcademicYear.findOne({ name });
    if (academicYear) {
        throw new Error("Academic year already exists");
    }
    //create
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
    });
    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: academicYearCreated,
    });
});

module.exports = { createAcademicYear };
