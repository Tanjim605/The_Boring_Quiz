const loginForm = (req, res) => {
    res.render('../../frontend/public/pages/login.ejs')
}

const teacherProfile = (req, res) => {
    res.render('../../frontend/public/pages/teacherProfile.ejs')
}

exports.loginForm = loginForm
exports.teacherProfile = teacherProfile
