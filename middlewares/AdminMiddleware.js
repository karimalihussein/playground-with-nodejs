const Admin = require('../models/Staff/Admin');

const isAdmin = async (req, res, next) => {
    const userId = req.userAuth?._id;
    const adminExists = await Admin.findById(userId);
    if(adminExists?.role == 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: "You are not authorized"});
    }
};

module.exports = isAdmin;