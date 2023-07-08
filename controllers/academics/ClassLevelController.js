const AysncHandler = require("express-async-handler");
const ClassLevel = require("../../models/Academic/ClassLevel");
const Admin = require("../../models/Staff/Admin");

const store = AysncHandler(async (req, res) => {
    const { name, description } = req.body;
    const classFound = await ClassLevel.findOne({ name });
    if(classFound) { throw new Error("Class already exists"); };
    const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(classCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Class created successfully",
        data: classCreated,
    });
});

const index = AysncHandler(async (req, res) => {
    const classes = await ClassLevel.find().select("-__v -createdAt -updatedAt").populate("createdBy", "name");
    res.status(200).json({
        status: "success",
        message: "Classes fetched successfully",
        data: classes,
    });
});

const show = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const classFound = await ClassLevel.findById(id).select("-__v -createdAt -updatedAt").populate("createdBy", "name");
    if (!classFound) { throw new Error("Class not found"); };
    res.status(200).json({
        status: "success",
        message: "Class fetched successfully",
        data: classFound
    });
});


const update = AysncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    const classFound = await ClassLevel.findOne({ name });
    if (classFound && classFound._id != id) {
        throw new Error("Class already exists");
    }
    const classUpdated = await ClassLevel.findByIdAndUpdate(id, {
        name,
        description,
        updatedBy: req.userAuth._id,
    }, { new: true });
    res.status(200).json({
        status: "success",
        message: "Class updated successfully",
        data: classUpdated,
    });
});

const destroy = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const classDeleted = await ClassLevel.findByIdAndDelete(id);
    if (!classDeleted) {
        throw new Error("Class not found");
    }
    res.status(200).json({
        status: "success",
        message: "Class deleted successfully",
        data: classDeleted,
    });
});


module.exports = { store, index, show, update, destroy };
