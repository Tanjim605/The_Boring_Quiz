const signUpForm = (req, res) => {
    res.render('../../frontend/public/pages/signup.ejs')
}

const loginForm = (req, res) => {
    res.render('../../frontend/public/pages/login.ejs')
}

const teacherProfile = (req, res) => {
    res.render('../../frontend/public/pages/teacherProfile.ejs')
}

const teacherQuizById = (req, res) => {
    res.render('../../frontend/public/pages/quizById.ejs')
}

const createQuiz = (req, res) => {
    res.render('../../frontend/public/pages/createQuiz.ejs')
}

const studentProfile = (req, res) => {
    res.render('../../frontend/public/pages/studentProfile.ejs')
}

const quizToStudent = (req, res) => {
    res.render('../../frontend/public/pages/quizToStudent.ejs')
}

exports.loginForm = loginForm
exports.signUpForm = signUpForm
exports.teacherProfile = teacherProfile
exports.teacherQuizById = teacherQuizById
exports.studentProfile = studentProfile
exports.createQuiz = createQuiz
exports.quizToStudent = quizToStudent
