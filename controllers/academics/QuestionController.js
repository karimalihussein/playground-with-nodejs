const AysncHandler = require("express-async-handler");
const Question = require("../../models/Academic/Questions");
const Teacher = require("../../models/Staff/Teacher");
const Exam = require("../../models/Academic/Exam");

const store = AysncHandler(async (req, res) => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;
    const teacher = await Teacher.findById(req.userAuth._id);
    const exam = await Exam.findById(req.params.examId);
    if (!teacher) { return res.json({ message: "Teacher does not exist!" }); };
    if (!exam) { return res.json({ message: "Exam does not exist!" }); };
    const questionCreated = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: teacher._id,
    });
    exam.questions.push(questionCreated._id);
    await exam.save();
    return res.json({ message: "Question created successfully!", questionCreated });
});

module.exports = { store };