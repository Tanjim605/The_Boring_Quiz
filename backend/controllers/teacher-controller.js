const Teacher = require('../models/teacher-model')

// Create a new teacher
const createTeacher = (req, res) => {
    try {
        const teacher = Teacher.create(req.body);
        // await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a teacher by ID
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a teacher by ID
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a teacher by ID
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.createTeacher = createTeacher
exports.getAllTeachers = getAllTeachers
exports.getTeacherById = getTeacherById
exports.updateTeacher = updateTeacher
exports.deleteTeacher = deleteTeacher
