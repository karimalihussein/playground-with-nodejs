const Student = require('../models/Academic/Student');
const VerifyToken = require("../utils/VerifyToken");

const isStudent = async (req, res, next) => {
    const userId = req.userAuth?.id;
    const studentFound = await Student.findById(userId);
    if (!studentFound || studentFound.role !== 'student') {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
};



const isStudentLoggedIn = async (req, res, next) => {
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
    const user = await Student.findById(verify.id);
    req.userAuth = user;
    next();
};

module.exports = { isStudent, isStudentLoggedIn };