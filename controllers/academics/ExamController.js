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



module.exports = { store, index };
