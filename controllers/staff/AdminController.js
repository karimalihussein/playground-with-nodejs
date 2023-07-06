const Admin = require('../../models/Staff/Admin');

/**
 * @description: Get all admins
 * @route: GET /api/admins
 * @access: Private
 */
const getAllAdmins = (req, res) => {
    try {
        res.status(200).json({
            message: 'Admins fetched successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        });
    }
}

/**
 * @description: Get admin by id
 * @route: GET /api/admins/:id
 * @access: Private
*/
const getAdminById = (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin fetched successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        }); 
    }
};

/**
 * @description: Update admin
 * @route: PUT /api/admins/:id
 * @access: Private
 */
const updateAdmin = (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin updated successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        }); 
    }
};

/**
 * @description: Delete admin
 * @route: DELETE /api/admins/:id
 * @access: Private
 */
const deleteAdmin = (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin deleted successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
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
            message: 'Teacher suspended successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
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
            message: 'Teacher unsuspended successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
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
            message: 'Teacher withdrawn successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
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
            message: 'Teacher unwithdrawn successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        }); 
    }
};



module.exports = { getAllAdmins, getAdminById, updateAdmin, deleteAdmin, suspendTeacher, unsuspendTeacher, withdrawTeacher, unwithdrawTeacher }







