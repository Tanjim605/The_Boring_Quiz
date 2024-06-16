const LaunchedQuiz = require('../models/launchedQuiz-model')

//create launched quiz 
const createLaunchedQuiz = async (req, res) => {
    const { room_id, quiz_id } = req.body
    // console.log('logging from controller');
    // console.log(req.body);
    try {
        const newLaunchedQuiz = new LaunchedQuiz({ room_id, quiz_id })
        await newLaunchedQuiz.save()
        res.status(201).json({ message: 'Quiz launched successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getQuizIdByRoomId = async (req, res) => {
    const room_id = req.params.id
    try {
        const room = await LaunchedQuiz.findOne({ room_id })
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.createLaunchedQuiz = createLaunchedQuiz
exports.getQuizIdByRoomId = getQuizIdByRoomId
