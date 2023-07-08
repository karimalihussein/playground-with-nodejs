const AysncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Subject = require("../../models/Academic/Subject");
const Admin = require("../../models/Staff/Admin");
const YearGroup = require("../../models/Academic/YearGroup");

const store = AysncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    const yearGroupFound = await YearGroup.findOne({ name });
    if (yearGroupFound) { throw new Error("Year Group isalready exists"); };
    const yearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id,
    });
    const admin = await Admin.findById(req.userAuth._id);
    admin.yearGroups.push(yearGroup._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Year Group created successfully",
        data: yearGroup,
    });
});

const index = AysncHandler(async (req, res) => {
    const YearGroups = await YearGroup.find().select('-__v -createdAt -updatedAt').populate('createdBy academicYear', 'name');
    res.status(200).json({
        status: 'success',
        message: 'Year Groups fetched successfully',
        data: YearGroups,
    });
});

const show = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const yearGroup = await YearGroup.findById(id).select('-__v -createdAt -updatedAt').populate('createdBy academicYear', 'name');
    if (!yearGroup) { throw new Error('Year Group not found'); };
    res.status(200).json({
        status: 'success',
        message: 'Year Group fetched successfully',
        data: yearGroup,
    });
});

const update = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, academicYear } = req.body;
    const yearGroupFound = await YearGroup.findOne({ name });
    if (yearGroupFound && yearGroupFound._id != id) { throw new Error('Year Group already exists'); };
    const yearGroupUpdated = await YearGroup.findByIdAndUpdate(id, {
        name,
        academicYear,
    }, { new: true });
    res.status(200).json({
        status: 'success',
        message: 'Year Group updated successfully',
        data: yearGroupUpdated,
    });
});

const destroy = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const yearGroup = await YearGroup.findByIdAndDelete(id);
    if (!yearGroup) { throw new Error('Year Group not found'); };
    res.status(200).json({
        status: 'success',
        message: 'Year Group deleted successfully',
        data: yearGroup,
    });
});


module.exports = { store, index, show, update, destroy };
