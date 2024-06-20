let teacherObj
const url_string = window.location.href

// console.log(url_string);
const t_id = url_string.split(`/teacher/`)[1]   // url ke duita array te vag kore fele. 2nd elemente hoilo t_id


async function fetchTeacherData() {
    const response = await fetch(`/api/teacher/${t_id}`)
    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }
    teacherObj = await response.json()
    // console.log(teacherObj.name);

    document.getElementById('t_name').innerText = teacherObj.name
    document.getElementById('t_mail').innerText = teacherObj.email
    document.getElementById('t_pass').innerText = teacherObj.password

    const quizzes = document.getElementById('t_quiz')
    if (teacherObj.quiz_ids.length == 0)
        quizzes.innerHTML = `You haven't created any quiz`

    for (let i = 0; i < teacherObj.quiz_ids.length; i++) {
        let quiz_link = window.location.href + `/quiz/${teacherObj.quiz_ids[i]._id}`
        quizzes.innerHTML += `<li> <a href="${quiz_link}"> ${teacherObj.quiz_ids[i].title} </a> </li>`

        // console.log(teacherObj.quiz_ids[i].title);
    }
}

fetchTeacherData()

function createQuiz() {
    window.location.href += `/createQuiz`
}

function viewResult() {
    // this is gonna change the url to see quiz result
    let roomNumber = prompt('Enter the exam room number to see result: ')
    showResult(roomNumber)
}

async function showResult(room_number){
    window.location.href += `/resultView/${room_number}`   // window page redirect kore.
}
