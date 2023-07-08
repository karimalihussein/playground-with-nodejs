const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    dateEmployed: { type: Date, required: true, default: Date.now },
    teacherId: { type: String, required: true, unique: true, default: function() {
        return (
            "TEA" 
            + Math.random(100 + Math.random() * 900)
            + Date.now().toString().slice(2, 4)
            + this.name.split(" ").map(name => name[0]).join("").toUpperCase()
        );
    }  },
    isWithdrawn: { type: Boolean, required: true, default: false },
    isSuspended: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: "teacher" },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: false },
    applicationStatus: { type: String, required: true, default: "pending", enum: ["pending", "approved", "rejected"] }, 
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: false },
    classLevel: { type: Schema.Types.ObjectId, ref: 'ClassLevel', required: false },
    acdemicYear: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: false },
    examsCreated: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],  
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: false },
    acdemicTerm: { type: Schema.Types.ObjectId, ref: 'AcademicTerm', required: false },
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;