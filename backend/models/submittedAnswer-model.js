const mongoose = require('mongoose')

const SubmittedAnswerSchema = mongoose.Schema(
    {
        room_id: {
            type: Schema.Types.ObjectId,
            ref: 'LaunchedQuiz',
            required: true
        },
        student_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Student', 
            required: true 
        },
        question_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        },
        option_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Option', 
            required: true 
        }
    }
)


const SubmittedAnswer = mongoose.model('SubmittedAnswer', SubmittedAnswerSchema);
