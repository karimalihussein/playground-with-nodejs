const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    optionsA: { type: String, required: true },
    optionsB: { type: String, required: true },
    optionsC: { type: String, required: true },
    optionsD: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
