const AysncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");

const store = AysncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    const program = await Program.findOne({ name });
    if(program) { throw new Error("Class already exists"); };
    const programCreated = await Program.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(programCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Program created successfully",
        data: programCreated,
    });
});

const index = AysncHandler(async (req, res) => {
    const programs = await Program.find().select("-__v -createdAt -updatedAt").populate("createdBy", "name");
    res.status(200).json({
        status: "success",
        message: "Programs fetched successfully",
        data: programs,
    });
});

const show = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const program = await Program.findById(id).select("-__v -createdAt -updatedAt").populate("createdBy", "name");
    if (!program) { throw new Error("Program not found"); };
    res.status(200).json({
        status: "success",
        message: "Program fetched successfully",
        data: program,
    });
});


const update = AysncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    const { id } = req.params;
    const programFound = await Program.findOne({ name });
    if (programFound && programFound._id != id) {
        throw new Error("Program already exists");
    };
    const programUpdated = await Program.findByIdAndUpdate(id, {
        name,
        description,
        duration,
    }, { new: true });
    res.status(200).json({
        status: "success",
        message: "Program updated successfully",
        data: programUpdated,
    });
});

const destroy = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const programDeleted = await Program.findByIdAndDelete(id);
    if (!programDeleted) { throw new Error("Program not found"); };
    res.status(200).json({
        status: "success",
        message: "Program deleted successfully",
        data: programDeleted,
    });
});


module.exports = { store, index, show, update, destroy };
