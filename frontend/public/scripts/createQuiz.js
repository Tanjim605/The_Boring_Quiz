const url_string = window.location.href
// console.log(url_string);
const t_id = (url_string.split(`/teacher/`)[1]).split(`/`)[0]       
// first we split it in t_id/createQuiz. then split again to get actual t_id
// console.log(t_id);

const questionContainer = document.getElementById('questions');


function showOptions() {
    let type = document.querySelector('input[name="q_type"]:checked').value
    document.querySelector('input[name="q_type"]:checked').checked = false
    if (type == 'mcq') {
        addMcqQuestion()
    } else if (type == 'tf') {
        addTfQuestion()
    }
}

function addMcqQuestion() {
    const questionIndex = questionContainer.children.length;

    const questionDiv = document.createElement('div')
    questionDiv.classList.add('question')

    questionDiv.innerHTML = `
                <h4>Question ${questionIndex + 1}</h4>
                <label for="statement-${questionIndex}">Statement:</label>
                <input type="text" id="statement-${questionIndex}" name="questions[${questionIndex}][statement]" required>
                <input type="text" id="questionType-${questionIndex}-0" name="questions[${questionIndex}][question_type]" value="mcq" readonly>
                
                <div class="options">
                    <h5>Options</h5>
                    <div class="option" data-question-index="${questionIndex}">
                        <label for="optionText-${questionIndex}-0">Option Text:</label>
                        <input type="text" id="optionText-${questionIndex}-0" name="questions[${questionIndex}][options][0][option_text]" required>
                        <label for="isCorrect-${questionIndex}-0">Is Correct:</label>
                        <input type="checkbox" id="isCorrect-${questionIndex}-0" name="questions[${questionIndex}][options][0][is_correct]">
                    </div>

                    <div class="option" data-question-index="${questionIndex}">
                        <label for="optionText-${questionIndex}-1">Option Text:</label>
                        <input type="text" id="optionText-${questionIndex}-1" name="questions[${questionIndex}][options][1][option_text]" required>
                        <label for="isCorrect-${questionIndex}-1">Is Correct:</label>
                        <input type="checkbox" id="isCorrect-${questionIndex}-1" name="questions[${questionIndex}][options][1][is_correct]">
                    </div>

                    <div class="option" data-question-index="${questionIndex}">
                        <label for="optionText-${questionIndex}-2">Option Text:</label>
                        <input type="text" id="optionText-${questionIndex}-2" name="questions[${questionIndex}][options][2][option_text]" required>
                        <label for="isCorrect-${questionIndex}-2">Is Correct:</label>
                        <input type="checkbox" id="isCorrect-${questionIndex}-2" name="questions[${questionIndex}][options][2][is_correct]">
                    </div>

                    <div class="option" data-question-index="${questionIndex}">
                        <label for="optionText-${questionIndex}-3">Option Text:</label>
                        <input type="text" id="optionText-${questionIndex}-3" name="questions[${questionIndex}][options][3][option_text]" required>
                        <label for="isCorrect-${questionIndex}-3">Is Correct:</label>
                        <input type="checkbox" id="isCorrect-${questionIndex}-3" name="questions[${questionIndex}][options][3][is_correct]">
                    </div>
                </div>
            `;

    questionContainer.appendChild(questionDiv)
}


function addTfQuestion() {
    const questionIndex = questionContainer.children.length;

    const questionDiv = document.createElement('div')
    questionDiv.classList.add('question')

    questionDiv.innerHTML = `
                <h4>Question ${questionIndex + 1}</h4>
                <label for="statement-${questionIndex}">Statement:</label>
                <input type="text" id="statement-${questionIndex}" name="questions[${questionIndex}][statement]" required>
                <input type="text" id="questionType-[${questionIndex}]-0" name="questions[${questionIndex}][question_type]" value="true/false" readonly>
                
                <div class="options">
                    <h5>Options</h5>
                    <div class="option" data-question-index="${questionIndex}">
                        <label for="optionText-${questionIndex}-0-t">Option Text:</label>
                        <input type="text" id="optionText-${questionIndex}-0-t" name="questions[${questionIndex}][options][0][option_text]" value="True" required readonly>

                        <label for="isCorrect-${questionIndex}-0-t">Is Correct:</label>
                        <input type="radio" id="isCorrect-${questionIndex}-0-t" name="questions[${questionIndex}][options][0][is_correct]">
                    </div>

                    <div class="option" data-question-index="${questionIndex}">
                        <label for="optionText-${questionIndex}-0-f">Option Text:</label>
                        <input type="text" id="optionText-${questionIndex}-1-f" name="questions[${questionIndex}][options][1][option_text]" value="False" required readonly>
                        
                        <label for="isCorrect-${questionIndex}-1-f">Is Correct:</label>
                        <input type="radio" id="isCorrect-${questionIndex}-1-f" name="questions[${questionIndex}][options][0][is_correct]">
                    </div>
                </div>
            `;

    questionContainer.appendChild(questionDiv)
}

document.getElementById('quizForm').addEventListener('submit',(event)=>{
    event.preventDefault()
    handleSubmit(event)
})

// Function to handle form submission
async function handleSubmit(event_from) {
    // event.preventDefault();

    const form = event_from.target;
    const formData = new FormData(form);

    const quizData = {
        title: formData.get('title'),
        teacher_id: t_id,     //ekhane logged teacher id kemne anbo
        questions: []
    };

    // Extract questions and options from form data
    const questionElements = document.querySelectorAll('.question');
    questionElements.forEach((questionElement, questionIndex) => {
        const statement = formData.get(`questions[${questionIndex}][statement]`);
        const questionType = formData.get(`questions[${questionIndex}][question_type]`);
        const options = [];

        const optionElements = questionElement.querySelectorAll('.option');
        optionElements.forEach((optionElement, optionIndex) => {
            const optionText = formData.get(`questions[${questionIndex}][options][${optionIndex}][option_text]`);
            const isCorrect = formData.has(`questions[${questionIndex}][options][${optionIndex}][is_correct]`);
            options.push({
                option_text: optionText,
                is_correct: isCorrect
            });
        });

        quizData.questions.push({
            statement: statement,
            question_type: questionType,
            options: options
        });
    });
console.log(quizData);
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
    }

    // Send quizData to the server

    const response = await fetch('/api/quiz/create', option);

    if (response.ok) {
        alert('Quiz created successfully!');
        form.reset();
    } else {
        alert('Error creating quiz');
    }
}
