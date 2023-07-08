const AysncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Subject = require("../../models/Academic/Subject");
const Admin = require("../../models/Staff/Admin");

const store = AysncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;
    const programFound = await Program.findById(req.params.programId);
    if (!programFound) { throw new Error("Program not found"); };
    const subjectFound = await Subject.findOne({ name });
    if (subjectFound) { throw new Error("Subject already exists"); };
    const subject = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    });
    programFound.subjects.push(subject._id);
    await programFound.save();
    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subject,
    });
});

const index = AysncHandler(async (req, res) => {
    const subjects = await Subject.find().select('-__v -createdAt -updatedAt').populate('createdBy academicTerm', 'name');
    res.status(200).json({
        status: 'success',
        message: 'Subjects fetched successfully',
        data: subjects,
    });
});

const show = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findById(id).select('-__v -createdAt -updatedAt').populate('createdBy academicTerm', 'name');
    if (!subject) { throw new Error('Subject not found'); };
    res.status(200).json({
        status: 'success',
        message: 'Subject fetched successfully',
        data: subject,
    });
});

const update = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, academicTerm } = req.body;
    const subjectFound = await Subject.findOne({ name });
    if (subjectFound && subjectFound._id != id) { throw new Error('Subject already exists'); };
    const subjectUpdated = await Subject.findByIdAndUpdate(id, {
        name,
        description,
        academicTerm,
    }, { new: true });
    res.status(200).json({
        status: 'success',
        message: 'Subject updated successfully',
        data: subjectUpdated,
    });
});

const destroy = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) { throw new Error('Subject not found'); };
    res.status(200).json({
        status: 'success',
        message: 'Subject deleted successfully',
        data: subject,
    });
});


module.exports = { store, index, show, update, destroy };
