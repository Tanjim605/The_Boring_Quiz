const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SubmittedAnswerSchema = mongoose.Schema(
    {
        room_id: {
            type: String,
            required: true
        },
        submissions: [
            {
                student_id: {
                    type: Schema.Types.ObjectId,       // Reference to the Student model
                    ref: 'Student'
                },
                submitted_option: [{             // Array of selected option IDs default e skip dibo
                    type: Schema.Types.ObjectId,
                    ref: 'Option',
                    default: "skip"
                }]
            }
        ]
    },
    {
        timestamps: true
    }
)


const SubmittedAnswer = mongoose.model('SubmittedAnswer', SubmittedAnswerSchema)

module.exports = SubmittedAnswer