const express = require('express')
const renderController = require('../controllers/render-controller')
const teacherController = require('../controllers/teacher-controller')

const router = express.Router()

router.get('/login', renderController.loginForm)

router.post('/login', teacherController.getTeacherByEmail)

router.get('/teacher/:id', renderController.teacherProfile)


module.exports = router