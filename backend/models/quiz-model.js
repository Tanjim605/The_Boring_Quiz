const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuizSchema = mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        question_ids: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Question',
            default: []
        }]
    },
    {
        timestamps: true
    }
)


const Quiz = mongoose.model("Quiz",QuizSchema)

module.exports = Quiz


/*
//  this teacher_id field is removed. we won't have to render quiz collection for teacher
//  we run function of teacher collection to get quiz_id array to render QUIZ under teacher


teacher_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
},
*/
