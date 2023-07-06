const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamResultsSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    grade: { type: Number, required: true },
    score: { type: Number, required: true },
    passMark: { type: Number, required: true, default: 50 },
    status: { type: String, required: true, default: 'failed', enum: ['passed', 'failed'] },
    remarks: { type: String, required: true, default: 'Poor', enum: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] },
    position: { type: Number, required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    classLevel: { type: Schema.Types.ObjectId, ref: 'ClassLevel', required: true },
    academicTerm: { type: Schema.Types.ObjectId, ref: 'AcademicTerm', required: true },
    academicYear: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    isPublished: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const ExamResults = mongoose.model('ExamResults', ExamResultsSchema);
module.exports = ExamResults;