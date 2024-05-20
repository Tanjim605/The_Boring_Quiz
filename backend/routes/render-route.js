const express = require('express')
const renderController = require('../controllers/render-controller')
const teacherController = require('../controllers/teacher-controller')
const { route } = require('./quiz-route')

const router = express.Router()

router.get('/login', renderController.loginForm)

router.get('/signUp', renderController.signUpForm)

// router.post('/login', teacherController.getTeacherByEmail)

router.get('/teacher/:id/', renderController.teacherProfile)

router.get('/teacher/:id/createQuiz', renderController.createQuiz)

router.get('/teacher/:t_id/quiz/:quiz_id', renderController.teacherQuizById)

router.get('/student/:id', renderController.studentProfile)


module.exports = router
