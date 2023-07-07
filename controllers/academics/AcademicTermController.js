const AysncHandler = require("express-async-handler");
const AcademicTerm = require("../../models/Academic/AcademicTerm");
const Admin = require("../../models/Staff/Admin");

const store = AysncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    //check if exists
    const academicTerm = await AcademicTerm.findOne({ name });
    if (academicTerm) {
        throw new Error("Academic Term already exists");
    }
    //create
    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic term created successfully",
        data: academicTermCreated,
    });
});

const index = AysncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find().select("-__v -createdAt -updatedAt").populate("createdBy", "name");
    res.status(200).json({
        status: "success",
        message: "Academic terms fetched successfully",
        data: academicTerms,
    });
});

const show = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const academicTerm = await AcademicTerm.findById(id).select("-__v -createdAt -updatedAt").populate("createdBy", "name");
    if (!academicTerm) {
        throw new Error("Academic term not found");
    }
    res.status(200).json({
        status: "success",
        message: "Academic term fetched successfully",
        data: academicTerm
    });
});


const update = AysncHandler(async (req, res) => {
    const { name, fromterm, toterm } = req.body;
    const { id } = req.params;
    const academicTermExists = await AcademicTerm.findOne({ name });
    if (academicTermExists && academicTermExists._id != id) {
        throw new Error("Academic term already exists");
    }
    const academicTerm = await AcademicTerm.findByIdAndUpdate(id, {
        name,
        fromterm,
        toterm,
    }, { new: true });
    if (!academicTerm) {
        throw new Error("Academic term not found");
    };

    res.status(200).json({
        status: "success",
        message: "Academic term updated successfully",
        data: academicTerm
    });
});


const destory = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const academicTerm = await AcademicTerm.findByIdAndDelete(id);
    if (!academicTerm) {
        throw new Error("Academic term not found");
    }
    res.status(200).json({
        status: "success",
        message: "Academic term deleted successfully",
        data: academicTerm
    });
});



module.exports = { store, index, show, update,  destory};
