// require('dotenv').config({ path: "./config.env" })       // this line is if the env file has some other name before the filename extension. for example "config.env"
require('dotenv').config()                                  // this works if the env file name is ".env"

const port = process.env.PORT || 8593           // port defined as localhost:8593 or hosting port

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const teacherRoutes = require('./routes/teacher-route')     // gotta add all of the routes
const studentRoutes = require('./routes/student-route')
const renderRoutes = require('./routes/render-route')
const quizRoutes = require('./routes/quiz-route')
const questionRoutes = require('./routes/question-route')
const optionRoutes = require('./routes/option-route')
const launchedQuizRoutes = require('./routes/launchedQuiz-route')
const submitAnswerRoutes = require('./routes/submittedAnswer-route')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('../frontend/public'))


// here add the path and routes for website
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/option', optionRoutes)
app.use('/api/launchedQuiz', launchedQuizRoutes)
app.use('/api/submission', submitAnswerRoutes)


app.use('/', renderRoutes)      // all types of page rendering is done by this


mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        console.log(`connected to the the_boring_quiz_DB`)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch(err => {
        console.log(`MongoDB connection FAILED ${err}`)
    })
