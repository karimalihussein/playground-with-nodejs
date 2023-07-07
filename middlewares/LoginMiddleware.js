const VerifyToken = require("../utils/VerifyToken");
const Admin = require("../models/Staff/Admin");
const IsLogin = async (req, res, next) => {
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
    const user = await Admin.findById(verify.id);
    req.userAuth = user;
    next();
};

module.exports = IsLogin;
