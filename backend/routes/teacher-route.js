const express = require('express')
const teacherController = require('../controllers/teacher-controller')

const router = express.Router()


router.post('/', teacherController.createTeacher)

router.get('/', teacherController.getAllTeachers)

router.get('/:id', teacherController.getTeacherById)

router.put('/:id', teacherController.updateTeacher)

router.delete('/:id', teacherController.deleteTeacher)

router.get('/login', teacherController.getTeacherByEmail)


module.exports = router
