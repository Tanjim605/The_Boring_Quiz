const url_string = window.location.href
const needed_url = url_string.split('/student/')[1].split('/attendQ/')
const studentId = needed_url[0]
const roomId = needed_url[1]

const quizTitleEl = document.getElementById('quiz_title')
const questionStatementEl = document.getElementById('question_statement')


async function fetchQuizData() {
    const getRoomResponse = await fetch(`/api/launchedQuiz/${roomId}`)
    let data = await getRoomResponse.json()
    quizId = data.quiz_id;      // this line gets quiz id from the room id

    const response = await fetch(`/api/quiz/${quizId}`)

    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }

    const quizObj = await response.json()

    quizTitleEl.innerText = quizObj.title

    let questionText = ""

    for (let i = 0; i < quizObj.question_ids.length; i++) {     // this i loop runs on question
        questionText += `<fieldset> Question: `
        questionText += quizObj.question_ids[i].statement
        questionText += `<br><br> Options: <ol>`
        // console.log(quizObj.question_ids[i].statement);
        for (let j = 0; j < quizObj.question_ids[i].option_ids.length; j++) {       // this j loop runs on options
            const optionText = quizObj.question_ids[i].option_ids[j].option_text;

            questionText += `<input type="radio" id="Question${i} Option${j}" name="Question${i}" value="${optionText}" />
            <label for="Question${i} Option${j}">${optionText}</label>`
            // questionText += `<li> ${optionText} </li>`
        }
        questionText += `</ol> </fieldset>`

    }
    if (quizObj.question_ids.length == 0)
        questionText = `There are no question in this quiz`
    questionStatementEl.innerHTML += questionText
}

fetchQuizData()