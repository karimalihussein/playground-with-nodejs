const Teacher = require("../../models/Staff/Teacher");
const AysncHandler = require("express-async-handler");
const generateToken = require("../../utils/GenerateToken");
const bcrypt = require("bcryptjs");
const Helpers = require("../../utils/Helpers");

const register = AysncHandler(async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const TeacherExists = await Teacher.findOne({
    email
  });
  if (TeacherExists) {
    return res.json({
      message: "Teacher is already exists!"
    });
  };
  const teacher = await Teacher.create({
    name,
    email,
    password: await Helpers.hashPassword(password),
  });
  res.status(201).json({
    message: "Teacher Registered successfully",
    status: "success",
    data: teacher,
  });
});

const login = AysncHandler(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const teacher = await Teacher.findOne({
    email
  });
  if (!teacher) {
    return res.json({
      message: "Teacher does not exist!"
    });
  };
  if (!await Helpers.comparePassword(password, teacher.password)) {
    return res.json({
      message: "Invalid email or password!"
    })
  };
  req.userAuth = teacher;
  res.status(200).json({
    message: "Teacher has been Logged successful!",
    status: "success",
    token: generateToken(teacher._id),
  });
});

const index = AysncHandler(async (req, res) => {
  const teachers = await Teacher.find({}).select('-password -createdAt -updatedAt -__v');
  res.status(200).json({
    message: "Teachers fetched successfully!",
    status: "success",
    data: teachers,
  });
});

const show = AysncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.json({
      message: "Teacher does not exist!"
    });
  };
  res.status(200).json({
    message: "Teacher fetched successfully!",
    status: "success",
    data: teacher,
  });
});

const getTeacherProfile = AysncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth._id).select('-password -createdAt -updatedAt -__v');
  if (!teacher) {
    return res.json({
      message: "Teacher does not exist!"
    });
  }
  res.status(200).json({
    message: "Your profile fetched successfully!",
    status: "success",
    data: teacher,
  });
});

const updateTeacherProfile = AysncHandler(async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const teacherFound = await Teacher.findOne({ email });
  if (teacherFound ) {
    return res.json({
      message: "Email already exists!"
    });
  };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
    name,
    email,
    password
  }, {
    new: true,
    runValidators: true,
  });

  if(!teacher) {
    return res.json({
      message: "Teacher does not exist!"
    });
  }

  res.status(200).json({
    message: "you're has been update your info successfully!",
    status: "success",
    data: teacher,
  })


});

const adminUpdateTeacherProfile = AysncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) { return res.json({ message: "Teacher does not exist!" }); }
  if(program) teacher.program = program;
  if(classLevel) teacher.classLevel = classLevel;
  if(academicYear) teacher.academicYear = academicYear;
  if(subject) teacher.subject = subject;
  await teacher.save();
  res.status(200).json({
    message: "Teacher has been updated successfully!",
    status: "success",
    data: teacher,
  });
});


module.exports = {
  register,
  login,
  index,
  show,
  getTeacherProfile,
  updateTeacherProfile,
  adminUpdateTeacherProfile
};