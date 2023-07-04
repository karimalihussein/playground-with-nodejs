const { Course } = require('../models/Course');
const asyncHandler = require("express-async-handler");
const { validateStore, validateUpdate } = require("../validations/CourseValidation");

const getAllCourses = asyncHandler(async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;
    const petPage = Number(req.query.petPageNumber) || 10;
    const courses = await Course.find().limit(petPage).skip(petPage * (page - 1));
    res.status(200).json(courses);
});

const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).json({ message: "The course with the given ID was not found."})
        return;
    }
    res.status(200).json(course);
});

const createCourse = asyncHandler(async (req, res) => {
    const { error } = validateStore(req.body);
    if (error) { res.status(400).json({ message: error.details[0].message }); return; }
    const course = new Course({
        name: req.body?.name,
        description: req.body?.description,
        price: req.body?.price,
        duration: req.body?.duration,
        instructor: req.body?.instructor,
        rating: req.body?.rating,
        category: req.body?.category,
        type: req.body?.type,
        image: req.body?.image,
    });
    const response = await course.save();
    res.status(201).json({ message: "Course created successfully", data: response });
});

const updateCourse = asyncHandler(async (req, res) => {
    const { error } = validateUpdate(req.body);
    if (error) { res.status(400).json({ message: error.details[0].message }); return; }
    const course = await Course.findByIdAndUpdate(
        req.params.id, {
        $set: {
            name: req.body?.name,
            description: req.body?.description,
            price: req.body?.price,
            duration: req.body?.duration,
            instructor: req.body?.instructor,
            rating: req.body?.rating,
            category: req.body?.category,
            type: req.body?.type,
            image: req.body?.image,
        },
    }, {
        new: true
    }
    );
    if (!course) {
        res.status(404).json({ message: "The course with the given ID was not found."})
        return;
    }
    res.status(200).json({ message: "Course updated successfully", data: course });
});

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
        res.status(404).json({ message: "The course with the given ID was not found."})
        return;
    }
    res.status(200).json({ message: "Course deleted successfully", data: course });
});


module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse }
