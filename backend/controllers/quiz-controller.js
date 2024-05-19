const Quiz = require('../models/quiz-model');
const Teacher = require('../models/teacher-model')
const Question = require('../models/question-model')
const Option = require('../models/option-model')

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate({ path: 'question_ids', populate: { path: 'option_ids' } });
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a quiz by ID
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate({ path: 'question_ids', populate: { path: 'option_ids' } });
        if (!quiz) {
            return res.status(404).send();
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a quiz by ID
const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body);
        if (!quiz) {
            return res.status(404).send();
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a quiz by ID
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
};



const createQuizFormUI = async (req, res) => {
    const { title, teacher_id, questions } = req.body;
    try {
        // Create a new quiz
        const newQuiz = new Quiz({ title, question_ids: [] });

        // Process each question
        for (const question of questions) {
            const newQuestion = new Question({
                statement: question.statement,
                question_type: question.question_type,
                option_ids: []
            });

            // Process each option for the question
            for (const option of question.options) {
                const newOption = new Option({
                    option_text: option.option_text,
                    is_correct: option.is_correct
                });

                await newOption.save();

                // Add the option ID to the question
                newQuestion.option_ids.push(newOption._id);
            }

            await newQuestion.save();

            // Add the question ID to the quiz
            newQuiz.question_ids.push(newQuestion._id);
        }

        await newQuiz.save();

        // Add the quiz ID to the teacher's quizzes array
        const teacher = await Teacher.findById(teacher_id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        
        // Ensure the quizzes array is initialized
        if (!teacher.quizzes) {
            teacher.quizzes = [];
        }

        teacher.quiz_ids.push(newQuiz._id);
        await teacher.save();

        res.status(201).json(newQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

exports.createQuizFormUI = createQuizFormUI

exports.createQuiz = createQuiz
exports.getAllQuizzes = getAllQuizzes
exports.getQuizById = getQuizById
exports.updateQuiz = updateQuiz
exports.deleteQuiz = deleteQuiz
