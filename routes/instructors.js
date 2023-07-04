const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const  InstructorController = require("../controllers/InstructorController");

router.route('/').get(InstructorController.getAllInstructors).post(verifyTokenAndAdmin, InstructorController.storeInstructor);
router.route('/:id').get(InstructorController.getInstructorById).put(verifyTokenAndAdmin, InstructorController.updateInstructor).delete(verifyTokenAndAdmin, InstructorController.deleteInstructor);


module.exports = router;