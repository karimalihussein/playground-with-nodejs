const Admin = require("../../models/Staff/Admin");
const AysncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

/**
 * @description: Get all admins
 * @route: GET /api/admins
 * @access: Private
 */
const getAllAdmins = AysncHandler(async (req, res) => {
    const admins = await Admin.find({});
    res.status(200).json({
        message: "Admins fetched successfully!",
        status: "success",
        data: admins,
    });
});

/**
 * @description: Get admin by id
 * @route: GET /api/admins/:id
 * @access: Private
 */
const getAdminById = AysncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if(!admin) { return res.status(404).json({ message: "Admin not found!" }); }
    res.status(200).json({
        message: "Admin fetched successfully!",
        status: "success",
        data: admin,
    });
});

/**
 * @description: Update admin
 * @route: PUT /api/admins/:id
 * @access: Private
 */
const updateAdmin = AysncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const adminFound = await Admin.findById(req.params.id);
    const emailExits = await Admin.findOne({ email });
    if(!adminFound) { return res.status(404).json({ message: "Admin not found!" }); }
    if(emailExits) { return res.status(400).json({ message: "Email already exists!" }); }
    const admin = await Admin.findByIdAndUpdate(req.params.id, { name, email, password }, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        message: "Admin updated successfully!",
        status: "success",
        data: admin,
    })
});

/**
 * @description: Delete admin
 * @route: DELETE /api/admins/:id
 * @access: Private
 */
const deleteAdmin = (req, res) => {
    try {
        res.status(200).json({
            message: "Admin deleted successfully!",
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            status: "error",
        });
    }
};

/**
 * @description: suspend a teacher
 * @route: PUT /api/admins/suspend/teacher/:id
 * @access: Private
 */
const suspendTeacher = (req, res) => {
    try {
        res.status(200).json({
            message: "Teacher suspended successfully!",
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            status: "error",
        });
    }
};

/**
 * @description: unsuspend a teacher
 * @route: PUT /api/admins/unsuspend/teacher/:id
 * @access: Private
 */
const unsuspendTeacher = (req, res) => {
    try {
        res.status(200).json({
            message: "Teacher unsuspended successfully!",
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            status: "error",
        });
    }
};

/**
 * @description: withdraw a teacher
 * @route: PUT /api/admins/withdraw/teacher/:id
 * @access: Private
 */
const withdrawTeacher = (req, res) => {
    try {
        res.status(200).json({
            message: "Teacher withdrawn successfully!",
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            status: "error",
        });
    }
};

/**
 * @description: unwithdraw a teacher
 * @route: PUT /api/admins/unwithdraw/teacher/:id
 * @access: Private
 */
const unwithdrawTeacher = (req, res) => {
    try {
        res.status(200).json({
            message: "Teacher unwithdrawn successfully!",
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            status: "error",
        });
    }
};

const adminProfile = AysncHandler(async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id);
    if (admin) {
        res.status(200).json({
            message: "Admin profile fetched successfully!",
            status: "success",
            data: admin,
        });
    } else {
        res.status(404).json({
            message: "Admin not found!",
            status: "error",
        });
    }
});

module.exports = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    suspendTeacher,
    unsuspendTeacher,
    withdrawTeacher,
    unwithdrawTeacher,
    adminProfile,
};
