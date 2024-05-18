const express = require('express')
const renderController = require('../controllers/render-controller')
const teacherController = require('../controllers/teacher-controller')

const router = express.Router()

router.get('/login', renderController.loginForm)

router.get('/signUp', renderController.signUpForm)

// router.post('/login', teacherController.getTeacherByEmail)

router.get('/teacher/:id/', renderController.teacherProfile)

router.get('/teacher/:id/createQuiz', renderController.createQuiz)

router.get('/student/:id', renderController.studentProfile)


module.exports = router
