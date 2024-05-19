const express = require('express')
const quizController = require('../controllers/quiz-controller')

const router = express.Router()


router.post('/create', quizController.createQuizFormUI);

router.post('/', quizController.createQuiz);

router.get('/', quizController.getAllQuizzes);

router.get('/:id', quizController.getQuizById);

router.put('/:id', quizController.updateQuiz);

router.delete('/:id', quizController.deleteQuiz);

module.exports = router
