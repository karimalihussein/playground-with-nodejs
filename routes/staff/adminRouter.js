const express = require('express');
const adminRouter = express.Router();

adminRouter.post('/register', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin registered successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        });
    }
});

adminRouter.post('/login', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged in successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        });
    }
});

adminRouter.post('/', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin created successfully!',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
            status: 'error'
        });
    }
});


adminRouter.get('/', (req, res) => {
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
});



adminRouter.get('/:id', (req, res) => {
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
  
});

adminRouter.put('/:id', (req, res) => {
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
  
});

adminRouter.delete('/:id', (req, res) => {
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
});

adminRouter.put('/suspend/teacher/:id', (req, res) => {
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
});


adminRouter.put('/unsuspend/teacher/:id', (req, res) => {
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
});

adminRouter.put('/withdraw/teacher/:id', (req, res) => {
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
});

adminRouter.put('/unwithdraw/teacher/:id', (req, res) => {
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
});


module.exports = adminRouter;






