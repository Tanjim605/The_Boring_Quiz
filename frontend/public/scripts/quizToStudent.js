const url_string = window.location.href
const needed_url = url_string.split('/student/')[1].split('/attendQ/')
const studentId = needed_url[0]
const roomId = needed_url[1]

const quizTitleEl = document.getElementById('quiz_title')
const questionStatementEl = document.getElementById('question_statement')
const submitQuizBtnEl = document.getElementById('submitQuizBtn')


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

    let questionText = `<form id="quizForm">`

    for (let i = 0; i < quizObj.question_ids.length; i++) {     // this i loop runs on question
        let j;
        questionText += `<fieldset> Question: `
        questionText += quizObj.question_ids[i].statement
        questionText += `<br><br> Options: <ol>`
        // console.log(quizObj.question_ids[i].statement);
        for (j = 0; j < quizObj.question_ids[i].option_ids.length; j++) {       // this j loop runs on options
            const optionText = quizObj.question_ids[i].option_ids[j].option_text;

            questionText += `<input type="radio" id="Question${i} Option${j}" name="${quizObj.question_ids[i]._id}" value="${quizObj.question_ids[i].option_ids[j]._id}" />
            <label for="Question${i} Option${j}">${optionText}</label>`
            // shob option er radio te question._id ta name hishebe jabe
            // questionText += `<li> ${optionText} </li>`
        }
        questionText += `<input type="radio" id="Question${i} Option${j}" name="${quizObj.question_ids[i]._id}" value="6673c351fa62e4905445dcbd" checked/>
            <label for="Question${i} Option${j}">Skip</label>`      // skip option for each question
            // value field e skip option tar _id hard code kora

        questionText += `</ol> </fieldset>`

    }
    questionText += `</form>`
    if (quizObj.question_ids.length == 0)
        questionText = `There are no question in this quiz`
    questionStatementEl.innerHTML += questionText
}

fetchQuizData()         // calling the function to render all questions



submitQuizBtnEl.addEventListener('click', async function () {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);

    // Creating submissions array
    const submissions = [];
    formData.forEach((value, key) => {
        submissions.push(value);
    });

    const student_id = studentId;
    const room_number = roomId;

    const dataToSend = {
        room_id: room_number,
        submissions: [
            {
                student_id: student_id,
                submitted_option: submissions
            }
        ]
    };

    // data server e patacchi
    try {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(`/api/submission/${room_number}`, option);

        if (response.ok) {
            const result = await response.json();
            console.log('Answers submitted successfully:', result);
        } else {
            console.error('Failed to submit answers:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting answers:', error);
    }
})
