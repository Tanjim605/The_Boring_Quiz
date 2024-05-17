const error_msgEl = document.getElementById('error-msg')
const formEl = document.getElementById('login_form')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')


let loggedUserId = ""
let matched = false


formEl.addEventListener('submit', (event) => {
    event.preventDefault()      // prevent form to reload ta page
})
// console.log(formEl)


function loginHandle() {
    const user = document.querySelector('input[name="user"]:checked')

    if (user.value == 'student')
        studentLogin()
    else if (user.value == 'teacher')
        teacherLogin()
}


async function studentLogin() {
    const response = await fetch(`../api/student`)

    if (!response.ok) {
        console.log(`something went wrong: ${response.status}`);
    }

    const student = await response.json()

    for (let i = 0; i < student.length; i++) {
        if (inputEmail.value == student[i].email) {
            loggedUserId = student[i]._id

            if (inputPassword.value == student[i].password) {
                matched = true
            }
        }
    }
    // console.log(student);
    if (matched) {
        window.location.href = `../student/${loggedUserId}`
    } else {
        error_msgEl.innerText = `Email or password is Invalid`
    }

    // response.render(`../student/${student._id}`)         // render function js e kaj kore na
}


async function teacherLogin() {
    const response = await fetch(`../api/teacher`)

    if (!response.ok) {
        console.log(`something went wrong: ${response.status}`);
    }

    const teacher = await response.json()

    for (let i = 0; i < teacher.length; i++) {
        if (inputEmail.value == teacher[i].email) {
            loggedUserId = teacher[i]._id

            if (inputPassword.value == teacher[i].password) {
                matched = true
            }
        }
    }
    // console.log(teacher);
    if (matched) {
        window.location.href = `../teacher/${loggedUserId}`
    } else {
        error_msgEl.innerText = `Email or password is Invalid`
    }

    // response.render(`../teacher/${teacher._id}`)         // render function js e kaj kore na
}
