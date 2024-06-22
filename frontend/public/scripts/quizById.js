const url_string = window.location.href

const quizId = url_string.split('/quiz/')[1]

const quizTitleEl = document.getElementById('quiz_title')
const questionStatementEl = document.getElementById('question_statement')
const optionsEl = document.getElementById('options')
const launchBtnEl = document.getElementById('launch_btn')
const roomNumberEl = document.getElementById('launch_room_number')

const optionSerial = 'abcd'

async function fetchQuizData() {
    const response = await fetch(`/api/quiz/${quizId}`)

    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }

    const quizObj = await response.json()

    quizTitleEl.innerText = quizObj.title

    let questionText = `<div class="bg-yellow-500 p-4 rounded-xl">`

    for (let i = 0; i < quizObj.question_ids.length; i++) {
        questionText += `
                            <div class="bg-gray-400 p-4 mb-4 rounded-xl">
                                <div class="bg-gray-300 mb-4 rounded-xl"> 
                                    Question: `
        questionText += quizObj.question_ids[i].statement
        questionText += `</div> <div class="bg-gray-300 rounded-xl"> Options: <ol class="justify-around"><div class="flex">`
        // console.log(quizObj.question_ids[i].statement);
        for (let j = 0; j < quizObj.question_ids[i].option_ids.length; j++) {
            const optionText = quizObj.question_ids[i].option_ids[j].option_text;

            if(j==2)
                questionText += `</div><div class="flex">`
            questionText += `<li class="w-full p-2 bg-slate-500 rounded-lg m-2 text-white">${optionSerial[j]}) ${optionText} </li>`
        }
        questionText += `</div></ol></div></div>`

    }
    questionText += `</div>`
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
        // alert('Quiz launched successfully');
        launchBtnEl.style.display = 'none'
        roomNumberEl.innerHTML = `<div class=" p-16">Quiz launched successfully
                                <br>
                                Quiz room number is: <span class="text-red-700 font-bold"> ${room_id} </span>
                                <br>
                                <span class= "font-thin">* Please copy the room number to share with your students</span></div>`
        // alert(`Quiz room number is: ${room_id}`)
    } else {
        const errorData = await response.json();
        alert('Error launching quiz: ' + errorData.message);
    }
}
