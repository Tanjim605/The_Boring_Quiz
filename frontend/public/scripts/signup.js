const error_msgEl = document.getElementById('error-msg')
const formEl = document.getElementById('signup_Form')
const inputName = document.getElementById('name')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')


formEl.addEventListener('submit', (event) => {
    event.preventDefault()      // prevent form to reload ta page
})


function signupHandle() {
    const user = document.querySelector('input[name="user"]:checked')

    if (user.value == 'student')
        studentSignUp()
    else if (user.value == 'teacher')
        teacherSignUP()
}


async function studentSignUp() {
    const name = inputName.value
    const email = inputEmail.value
    const password = inputPassword.value

    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    }

    const response = await fetch('api/student/', option)

    if (response.ok) {
        alert('Student signed sp successfully');
    } else {
        const errorData = await response.json();
        alert('Error creating student account: ' + errorData.message);
    }
}


async function teacherSignUP() {
    const name = inputName.value
    const email = inputEmail.value
    const password = inputPassword.value

    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    }

    const response = await fetch('api/teacher/', option)

    if (response.ok) {
        alert('Teacher signed up successfully');
    } else {
        const errorData = await response.json();
        alert(`Error creating teacher's account : ` + errorData.message);
    }
}

