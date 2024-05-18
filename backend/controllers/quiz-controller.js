const Quiz = require('../models/quiz-model');

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


exports.createQuiz = createQuiz
exports.getAllQuizzes = getAllQuizzes
exports.getQuizById = getQuizById
exports.updateQuiz = updateQuiz
exports.deleteQuiz = deleteQuiz
