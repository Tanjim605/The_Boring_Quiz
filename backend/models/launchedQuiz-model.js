const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LaunchedQuizSchema = mongoose.Schema(
    {
        room_id: {
            type: String,
            required: true
        },
        quiz_id: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz',
            required: true
        }
    }
)


const LaunchedQuiz = mongoose.model("LaunchedQuiz",LaunchedQuizSchema)

module.exports = LaunchedQuiz
