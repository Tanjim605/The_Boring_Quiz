const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StudentSchema = mongoose.Schema(
    {
        student_id: {
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
        }
    }
)


const Student = mongoose.model("Student",StudentSchema)
