const url_string = window.location.href
const room_number = url_string.split('/resultView/')[1]

const quizTitleEl = document.getElementById('quiz_title')
const tableEl = document.getElementById('result_table')


let tableDataHtml = `<table>
                        <thead>
                            <tr>
                                <th></th>`

// console.log(room_number);
/*
    ei room_number diye ekhn quiz_id ber kora lagbe,        done
    oi quiz_id diye questions array er size shoman table er columns hobe        done

    room_number diye submittedAnswers er collection theke submissions array er size shoman row hobe     done

    submissions[i].student_id hoilo row head    done

    _id gular opposite e data boshano lagbe
    
    */

async function fetchData() {
    const getRoomResponse = await fetch(`/api/launchedQuiz/${room_number}`)
    let data = await getRoomResponse.json()

    const quizId = data.quiz_id;      // this line gets quiz id from the room id

    const response = await fetch(`/api/quiz/${quizId}`)

    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }

    const quizObj = await response.json()       // Quiz collections gula ekhane
    quizTitleEl.innerText = quizObj.title

    const totalQuestions = quizObj.question_ids.length      // give us total amount of questions in the quiz

    const getSubmissionResponse = await fetch(`/api/submission/room/${room_number}`)

    const submissionObj = await getSubmissionResponse.json()

    // console.log(submissionObj);

    const totalStudentParticipated = submissionObj.submissions.length

    for (let h = 1; h <= totalQuestions; h++) {     // loop to setup table header
        tableDataHtml += `<th> Q${h} </th>`
    }
    tableDataHtml += `</tr>
                        </thead>
                        <tbody>`                    // table head done here


    for (let i = 0; i < totalStudentParticipated; i++) {
        const studentResponse = await fetch(`/api/student/${submissionObj.submissions[i].student_id}`)
        if (!studentResponse.ok) {
            console.log(`Something went wrong ${studentResponse.status}`);

            return studentResponse.json()
        }
        studentObj = await studentResponse.json()
        tableDataHtml += `<tr>
                            <td>${studentObj.name}</td>`
        // participate kora student er id
        for (let j = 0; j < totalQuestions; j++) {
            const optionResponse = await fetch(`/api/option/${submissionObj.submissions[i].submitted_option[j]}`)
            if (!optionResponse.ok) {
                console.log(`Something went wrong ${optionResponse.status}`);

                return optionResponse.json()
            }
            optionObj = await optionResponse.json()
            // console.log(optionObj);
            tableDataHtml += `<td>${optionObj.option_text}</td>`        //returning option text
            // option gular id
        }
        tableDataHtml += `</tr>`
    }
    tableDataHtml += `</tbody></table>`         // table finishing

    tableEl.innerHTML = tableDataHtml
    // console.log(submissionObj.submissions[0]);
}

fetchData()
