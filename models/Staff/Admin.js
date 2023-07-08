const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const adminSchema = Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, enum: ["admin", "staff"], default: "staff"},
    academicTerms: [{ type: mongoose.Schema.Types.ObjectId, ref: "AcademicTerm"}],
    academicYears: [{ type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear"}],
    classLevels: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClassLevel"}],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher"}],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student"}],
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program"}],
    yearGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "YearGroup"}],
  },
  { timestamps: true }
);

// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   // const salt = await bcrypt.genSalt(10);
//   // const hashedPassword = await bcrypt.hash(this.password, salt);
//   // this.password = hashedPassword;
//   next();
// });

// adminSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
