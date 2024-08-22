const url_string = window.location.href
const needed_url = url_string.split('/student/')[1].split('/attendQ/')
const studentId = needed_url[0]
const roomId = needed_url[1]
const studentProfileUrl = url_string.split('/attendQ/')[0]

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
        questionText += `<fieldset class=" text-xl"> Question ${i+1}. &nbsp &nbsp `
        questionText += quizObj.question_ids[i].statement
        questionText += `<br><br> 
                        Option: 
                            <div class="flex w-full flex-wrap justify-center">`
        // console.log(quizObj.question_ids[i].statement);
        for (j = 0; j < quizObj.question_ids[i].option_ids.length; j++) {       // this j loop runs on options
            const optionText = quizObj.question_ids[i].option_ids[j].option_text;

            questionText += `<div class="w-1/3 min-w-44 m-1">
                                <input 
                                    type="radio" 
                                    id="Question${i} Option${j}" 
                                    name="${quizObj.question_ids[i]._id}" 
                                    value="${quizObj.question_ids[i].option_ids[j]._id}" 
                                    class="hidden peer"
                                />
                                <label 
                                    for="Question${i} Option${j}" 
                                    class="inline-flex items-center justify-between w-full text-center p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:font-semibold hover:text-gray-700 hover:bg-gray-200">${optionText}
                                </label>
                            </div>`
            // shob option er radio te question._id ta name hishebe jabe
            // questionText += `<li> ${optionText} </li>`
        }
        questionText += `<div class="w-1/3 min-w-44 m-1">
                            <input 
                                class="hidden peer"
                                type="radio" 
                                id="Question${i} Option${j}" 
                                name="${quizObj.question_ids[i]._id}"
                                value="6673c351fa62e4905445dcbd" 
                                checked
                            />
                            <label 
                                for="Question${i} Option${j}"
                                class="inline-flex items-center justify-between w-full text-center p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:font-semibold hover:text-gray-600 hover:bg-gray-100">
                                Skip
                            </label>
                        </div>`      // skip option for each question
            // value field e skip option tar _id hard code kora

        questionText += `</div> </fieldset>`
        if(i<quizObj.question_ids.length-1)
            questionText += `<hr>`

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
        room_id: roomId,
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

        const response = await fetch(`/api/submission/${roomId}`, option);

        if (response.ok) {
            const result = await response.json();
            console.log('Answers submitted successfully:', result);
             window.location.href = studentProfileUrl    // this redirect the site to user profile
        } else {
            console.error('Failed to submit answers:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting answers:', error);
    }
})
