const Teacher = require('../models/teacher-model')

// Create a new teacher
const createTeacher = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newTeacher = new Teacher({ name, email, password, quizzes: [] });
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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

// For login purpose
const getTeacherByEmail = async (req, res) => {
    const { email, password } = req.body
    // console.log(req.body);
    try {
        const teacher = await Teacher.findOne({ email })

        if (!teacher) {
            return res.status(400).json({ message: 'No mail found' });
        }

        const isMatch = (teacher.password == password)

        if (isMatch) {
            // console.log(teacher)
            res.redirect(`../teacher/${teacher._id}`)
            // res.render('../../frontend/public/pages/teacherProfile.ejs')
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}


exports.createTeacher = createTeacher
exports.getAllTeachers = getAllTeachers
exports.getTeacherById = getTeacherById
exports.updateTeacher = updateTeacher
exports.deleteTeacher = deleteTeacher

exports.getTeacherByEmail = getTeacherByEmail
