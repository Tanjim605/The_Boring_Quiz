const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema(
    {
        statement: { 
            type: String, 
            required: true 
        },
        question_type: { 
            type: String, 
            enum: ['true/false', 'mcq'],    // enum er karone new question create korar shomoy ei duita type er ekta choose korte hobe. CAN'T USE ANY OTHER NAME THEN THOSE.
            required: true 
        },
        option_ids: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Option',
            default: []
        }]
    },
    {
        timestamps: true
    }
)


const Question = mongoose.model("Question",QuestionSchema)

module.exports = Question
