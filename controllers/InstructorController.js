const { Instructor } = require("../models/Instructor");
const asyncHandler = require("express-async-handler");
const { validateStoreInstructor, validateUpdateInstructor } = require("../validations/InstructorValidation");
const LoggerService = require("../services/LoggerService");
const logger = new LoggerService('instructor controller');



const getAllInstructors = asyncHandler(async (req, res) => {
    logger.setLogData({
        route: req.originalUrl,
        body: req.body,
        query: req.query,
        params: req.params,
    });
    await logger.info();
    const page = Number(req.query.pageNumber) || 1;
    const petPage = Number(req.query.petPageNumber) || 10;
    const instructors = await Instructor.find().limit(petPage).skip(petPage * (page - 1));
    res.status(200).json(instructors);
});

const getInstructorById = asyncHandler(async (req, res) => {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
        res.status(404).json({ message: "The instructor with the given ID was not found."})
        return;
    }
    res.status(200).json(instructor);
});

const storeInstructor = asyncHandler(async (req, res) => {
    const { error } = validateStoreInstructor(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const newInstructor = new Instructor({
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        role: req.body?.role,
        email: req.body?.email,
        image: req.body?.image,
    });
    const response = await newInstructor.save();
    res.status(201).send(response);
});

const updateInstructor = asyncHandler(async (req, res) => {
    const { error } = validateUpdateInstructor(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const instructor = await Instructor.findByIdAndUpdate(
        req.params.id, {
        $set: {
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            role: req.body?.role,
            email: req.body?.email,
            image: req.body?.image,
        },
    }, {
        new: true
    }
    );
    if (!instructor) {
        res.status(404).json({ message: "The instructor with the given ID was not found."})
        return;
    }
    res.status(200).json(instructor);
});

const deleteInstructor = asyncHandler(async (req, res) => {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
        res.status(404).json({ message: "The instructor with the given ID was not found."})
        return;
    }
    res.status(200).json({ message: "Instructor deleted successfully."});
});


module.exports = { getAllInstructors, getInstructorById, storeInstructor, updateInstructor, deleteInstructor }