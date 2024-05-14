const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TeacherSchema = mongoose.Schema(
    {
        teacher_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: { 
            type: String, 
            required: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        quiz_ids: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Quiz' 
        }]
    }
)


const Teacher = mongoose.model("Teacher",TeacherSchema)     // this creates a collection in mongodb named "teachers"
