const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    studentId: { type: String, required: true, unique: true, index: true, 
        default: function () {
            return (
                "ST" 
                + Math.floor(100 + Math.random() * 900)
                + Date.now().toString().slice(2, 4)
                + this.name.split(' ').map((n) => n[0]).join('').toUpperCase()
            );
        }
    },
    isWitdrawn: { type: Boolean, default: false },
    role: { type: String, default: 'student' },
    classLevels: [{ type: Schema.Types.ObjectId, ref: 'ClassLevel', required: false }],
    currentClassLevel: { type: String, required: false,
        default: function () {
            return this.classLevels[this.classLevels.length - 1];
        }
    },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: false },
    dateAdmitted: { type: Date, default: Date.now },
    examResults: [{ type: Schema.Types.ObjectId, ref: 'ExamResult' }],
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: false },
    isPromotedToLevel200: { type: Boolean, default: false },
    isPromotedToLevel300: { type: Boolean, default: false },
    isPromotedToLevel400: { type: Boolean, default: false },
    isGraduated: { type: Boolean, default: false },
    isWithdrawn: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    perfectName: { type: String, default: '' },
    yearGraduated: { type: String, default: '' }, 

}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;