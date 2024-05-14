const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OptionSchema = mongoose.Schema(
    {
        option_id: { 
            type: String, 
            required: true 
        },
        option_text: { 
            type: String, 
            required: true 
        },
        is_correct: { 
            type: Boolean, 
            required: true 
        }
    }
)


const Option = mongoose.model("Option",OptionSchema)
