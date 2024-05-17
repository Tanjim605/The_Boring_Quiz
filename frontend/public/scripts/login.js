const error_msgEl = document.getElementById('error-msg')
const formEl = document.getElementById('login_form')
const inputEmail = document.getElementById('email')


let loggedUserId = ""

formEl.addEventListener('submit', (event) => {
    event.preventDefault()      // prevent form to reload ta page
})
// console.log(formEl)


function loginHandle() {
    const user = document.querySelector('input[name="user"]:checked')
    // console.log(user.value);
    if(user.value == 'student')
        studentLogin()
    else if(user.value == 'teacher')
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
            break
        }
    }
    // console.log(student);    
    window.location.href = `../student/${loggedUserId}`

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
            break
        }
    }
    // console.log(teacher);    
    window.location.href = `../teacher/${loggedUserId}`

    // response.render(`../teacher/${teacher._id}`)         // render function js e kaj kore na

}
