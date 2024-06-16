const express = require('express')
const launchedQuizController = require('../controllers/launchedQuiz-controller')

const router = express.Router()

router.post('/', launchedQuizController.createLaunchedQuiz)

router.get('/:id', launchedQuizController.getQuizIdByRoomId)

module.exports = router
