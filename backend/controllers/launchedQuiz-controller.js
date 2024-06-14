const launchedQuiz = require('../models/launchedQuiz-model')

//create launched quiz 
const createLaunchedQuiz = async (req, res) => {
    const { room_id, quiz_id } = req.body
    // console.log('logging from controller');
    // console.log(req.body);
    try {
        const newLaunchedQuiz = new launchedQuiz({ room_id, quiz_id })
        await newLaunchedQuiz.save()
        res.status(201).json({ message: 'Quiz launched successfully'})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

exports.createLaunchedQuiz = createLaunchedQuiz
