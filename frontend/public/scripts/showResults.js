const url_string = window.location.href
const room_number = url_string.split('/resultView/')[1]

const quizTitleEl = document.getElementById('quiz_title')
const tableEl = document.getElementById('result_table')
const loadingEl = document.getElementById('loader-wrapper')


let tableDataHtml = `<table class="w-full text-md text-center text-gray-700 z-10 border-2 border-white  ">
                        <thead class="sticky top-24 uppercase bg-green-600 text-white rounded-xl">
                            <tr class="sticky top-24">
                                <th>Sl.</th>
                                <th>Student Name</th>`

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
    quizTitleEl.innerHTML += `<a href="../quiz/${quizObj._id}">${quizObj.title} </a>` 

    const totalQuestions = quizObj.question_ids.length      // give us total amount of questions in the quiz

    const getSubmissionResponse = await fetch(`/api/submission/room/${room_number}`)

    const submissionObj = await getSubmissionResponse.json()

    // console.log(submissionObj);

    const totalStudentParticipated = submissionObj.submissions.length

    for (let h = 1; h <= totalQuestions; h++) {     // loop to setup table header
        tableDataHtml += `<th class="py-4"> Q${h} </th>`
    }
    tableDataHtml += `<th>Total Correct Answer</th>
                        </tr>
                            </thead>
                                <tbody>`                    // table head done here


    for (let i = 0; i < totalStudentParticipated; i++) {
        const studentResponse = await fetch(`/api/student/${submissionObj.submissions[i].student_id}`)
        if (!studentResponse.ok) {
            console.log(`Something went wrong ${studentResponse.status}`);

            return studentResponse.json()
        }
        studentObj = await studentResponse.json()
        tableDataHtml += `<tr class="even:bg-green-50">
                            <td>${i+1}</td>
                            <td class="px-6 py-3">${studentObj.name}</td>`
        let correctAnswer = 0
        // participate kora student er id
        for (let j = 0; j < totalQuestions; j++) {
            const optionResponse = await fetch(`/api/option/${submissionObj.submissions[i].submitted_option[j]}`)
            if (!optionResponse.ok) {
                console.log(`Something went wrong ${optionResponse.status}`);

                return optionResponse.json()
            }
            optionObj = await optionResponse.json()
            // console.log(optionObj);
            if(optionObj.is_correct == true)
                {
                    tableDataHtml += `<td class="px-6 py-3 bg-green-300">${optionObj.option_text}</td>`        //returning option text
                    correctAnswer++
                }
            else if(optionObj.option_text == 'skipped')
                tableDataHtml += `<td class="px-6 py-3 bg-yellow-200">${optionObj.option_text}</td>`
            else if(optionObj.is_correct == false)
                tableDataHtml += `<td class="px-6 py-3 bg-red-300">${optionObj.option_text}</td>`
            
            // option gular id
        }
        tableDataHtml += `<td>${correctAnswer}</td></tr>`
    }
    tableDataHtml += `</tbody></table>`         // table finishing
    loadingEl.style.display = 'none'
    tableEl.innerHTML = tableDataHtml
    // console.log(submissionObj.submissions[0]);
}

fetchData()
