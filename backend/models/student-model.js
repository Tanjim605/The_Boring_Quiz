const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StudentSchema = mongoose.Schema(
    {
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
    },
    {
        timestamps: true
    }
)


const Student = mongoose.model("Student",StudentSchema)

module.exports = Student
