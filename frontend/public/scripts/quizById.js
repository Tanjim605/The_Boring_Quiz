const url_string = window.location.href

const quizId = url_string.split('/quiz/')[1]

const quizTitleEl = document.getElementById('quiz_title')
const questionStatementEl = document.getElementById('question_statement')
const optionsEl = document.getElementById('options')

async function fetchQuizData() {
    const response = await fetch(`/api/quiz/${quizId}`)

    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }

    const quizObj = await response.json()

    quizTitleEl.innerText = quizObj.title

    let questionText = ""

    for (let i = 0; i < quizObj.question_ids.length; i++) {
        questionText += `Question: `
        questionText += quizObj.question_ids[i].statement
        questionText += `<br><br> Options: <ol>`
        // console.log(quizObj.question_ids[i].statement);
        for (let j = 0; j < quizObj.question_ids[i].option_ids.length; j++) {
            const optionText = quizObj.question_ids[i].option_ids[j].option_text;

            questionText += `<li> ${optionText} </li>`
        }
        questionText += `</ol>`

    }
    if (quizObj.question_ids.length == 0)
        questionText = `There are no question in this quiz`
    questionStatementEl.innerHTML += questionText
}

fetchQuizData()

function generateRandomString(length = 5) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }

    return randomString;
}

async function launchQuiz() {
    let room_id = generateRandomString();
    let quiz_id = quizId
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ room_id, quiz_id })
    }

    const response = await fetch('../../../api/launchedQuiz', option)

    console.log(response);

    if (response.ok) {
        alert('Quiz launched successfully');
        alert(`Quiz room number is: ${room_id}`)
    } else {
        const errorData = await response.json();
        alert('Error launching quiz: ' + errorData.message);
    }
}
