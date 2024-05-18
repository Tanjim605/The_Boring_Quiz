const Question = require('../models/question-model');

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).send(question);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('option_ids');
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a question by ID
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('option_ids');
        if (!question) {
            return res.status(404).send();
        }
        res.status(200).send(question);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body);
        if (!question) {
            return res.status(404).send();
        }
        res.status(200).send(question);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).send();
        }
        res.status(200).send(question);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.createQuestion = createQuestion
exports.getAllQuestions = getAllQuestions
exports.getQuestionById = getQuestionById
exports.updateQuestion = updateQuestion
exports.deleteQuestion = deleteQuestion
