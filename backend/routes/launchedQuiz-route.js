const express = require('express')
const launchedQuizController = require('../controllers/launchedQuiz-controller')

const router = express.Router()

router.post('/', launchedQuizController.createLaunchedQuiz)


module.exports = router
