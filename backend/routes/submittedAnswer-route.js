const express = require('express')
const submittedAnswerController = require('../controllers/submittedAnswer-controller')

const router = express.Router()


// Route to submit answers
router.post('/:roomId', submittedAnswerController.updateSubmissionsByRoomNumber);

// Route to get all submissions
router.get('/', submittedAnswerController.getAllSubmissions);

// Route to get all submissions for a specific room number
router.get('/room/:room_id', submittedAnswerController.getSubmissionsByRoomNumber);


module.exports = router
