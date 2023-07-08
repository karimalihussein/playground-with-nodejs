const AysncHandler = require("express-async-handler");
const Exam = require("../../models/Academic/Exam");
const Teacher = require("../../models/Staff/Teacher");

const store = AysncHandler(async (req, res) => {
    const {
        name,
        description,
        subject,
        program,
        duration,
        examDate,
        examTime,
        examType,
        classLevel,
        academicYear,
        academicTerm,
    } = req.body;
    const examFound = await Exam.findOne({ name });
    if (examFound) { throw new Error("Exam already exists"); }
    const teacherFound = await Teacher.findById(req.userAuth?._id);
    if (!teacherFound) { throw new Error("Teacher not found"); }
    const exam = new Exam({
        name,
        description,
        subject,
        program,
        duration,
        examDate,
        examTime,
        examType,
        classLevel,
        academicYear,
        academicTerm,
        createdBy: teacherFound._id
    });
    teacherFound.exams.push(exam._id);
    await exam.save();
    await teacherFound.save();
    res.status(201).json({
        status: "success",
        message: "Exam created successfully",
        data: exam,
    });
});

const index = AysncHandler(async (req, res) => {
    const exams = await Exam.find().select("-__v -createdAt -updatedAt").populate("createdBy program subject classLevel academicYear academicTerm", "name");
    res.status(200).json({
        status: "success",
        message: "Exams fetched successfully",
        data: exams,
    });    
});

const show = AysncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id).select("-__v -createdAt -updatedAt").populate("createdBy program subject classLevel academicYear academicTerm", "name");
    if (!exam) { throw new Error("Exam not found"); }
    res.status(200).json({
        status: "success",
        message: "Exam fetched successfully",
        data: exam,
    });
});

const update = AysncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        subject,
        program,
        duration,
        examDate,
        examTime,
        examType,
        classLevel,
        academicYear,
        academicTerm,
    } = req.body;
    const examUpdated = await Exam.findByIdAndUpdate(id, {
        name,
        description,
        subject,
        program,
        duration,
        examDate,
        examTime,
        examType,
        classLevel,
        academicYear,
        academicTerm,
    }, { new: true });
    if (!examUpdated) { throw new Error("Exam not found"); }
    res.status(200).json({
        status: "success",
        message: "Exam updated successfully",
        data: examUpdated,
    });
});


const destroy = AysncHandler(async (req, res) => {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) { throw new Error("Exam not found"); }
    res.status(200).json({
        status: "success",
        message: "Exam deleted successfully",
        data: null,
    });
});



module.exports = { store, index, show, update, destroy };
