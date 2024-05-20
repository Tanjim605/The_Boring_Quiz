const url_string = window.location.href

const quizId = url_string.split('/quiz/')[1]

const quizTitleEl = document.getElementById('quiz_title')
const questionStatementEl = document.getElementById('question_statement')
const optionsEl = document.getElementById('options')

async function fetchQuizData(){
    const response = await fetch(`/api/quiz/${quizId}`)

    if(!response.ok){
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }

    const quizObj = await response.json()
    
    quizTitleEl.innerText = quizObj.title

    let questionText = ""

    for(let i=0;i<quizObj.question_ids.length;i++)
    {
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
    if(quizObj.question_ids.length == 0)
        questionText = `There are no question in this quiz`
    questionStatementEl.innerHTML += questionText
}

fetchQuizData()
