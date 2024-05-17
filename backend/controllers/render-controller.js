const loginForm = (req, res) => {
    res.render('../../frontend/public/pages/login.ejs')
}

const teacherProfile = (req, res) => {
    res.render('../../frontend/public/pages/teacherProfile.ejs')
}

const studentProfile = (req,res) => {
    res.render('../../frontend/public/pages/studentProfile.ejs')
}

exports.loginForm = loginForm
exports.teacherProfile = teacherProfile
exports.studentProfile = studentProfile
