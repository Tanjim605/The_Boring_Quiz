const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuizSchema = mongoose.Schema(
    {
        quiz_id: { 
            type: String, 
            required: true 
        },
        title: { 
            type: String, 
            required: true 
        },
        teacher_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Teacher', 
            required: true 
        },
        question_ids: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Question' 
        }]
    }
)


const Quiz = mongoose.model("Quiz",QuizSchema)
