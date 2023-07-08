const Teacher = require('../models/Staff/Teacher');
const VerifyToken = require("../utils/VerifyToken");

const isTeacher = async (req, res, next) => {
    const userId = req.userAuth?.id;
    const teacherFound = await Teacher.findById(userId);
    if (!teacherFound) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
};



const isTeacherLoggedIn = async (req, res, next) => {
    const headerToken = req.headers;
    const token = headerToken?.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
    const verify = VerifyToken(token);
    if (!verify) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
    const user = await Teacher.findById(verify.id);
    console.log(user);
    req.userAuth = user;
    next();
};

module.exports = { isTeacher, isTeacherLoggedIn };