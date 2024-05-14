const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema(
    {
        question_id: {
            type: String,
            required: true
        },
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
            ref: 'Option' 
        }]
    }
)


const Question = mongoose.model("Question",QuestionSchema)
