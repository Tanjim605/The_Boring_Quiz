const port = process.env.PORT || 8593           // port defined as localhost:8593 or hosting port

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const teacherRoutes = require('./routes/teacher-route')     // gotta add all of the routes
const studentRoutes = require('./routes/student-route')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('../frontend/public'))


// here add the path and routes for website
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentRoutes)



mongoose.connect('mongodb+srv://c213076:qZPntQBkLAauWGw1@backenddb.pwut9sa.mongodb.net/the_boring_quiz_DB?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log(`connected to the the_boring_quiz_DB`)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch(err => {
        console.log(`MongoDB connection FAILED ${err}`)
    })
