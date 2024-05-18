const Option = require('../models/option-model');

// Create a new option
const createOption = async (req, res) => {
  try {
    const option = new Option(req.body);
    await option.save();
    res.status(201).send(option);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all options
const getAllOptions = async (req, res) => {       // this controller shouldn't use in main app. I build this just to test
  try {
    const options = await Option.find()
    if (!options) {
      return res.status(404).send()
    }
    res.status(200).send(options)
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get an option by ID
const getOptionById = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    if (!option) {
      return res.status(404).send();
    }
    res.status(200).send(option);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an option by ID
const updateOption = async (req, res) => {
  try {
    const option = await Option.findByIdAndUpdate(req.params.id, req.body);
    if (!option) {
      return res.status(404).send();
    }
    res.status(200).send(option);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an option by ID
const deleteOption = async (req, res) => {
  try {
    const option = await Option.findByIdAndDelete(req.params.id);
    if (!option) {
      return res.status(404).send();
    }
    res.status(200).send(option);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.createOption = createOption
exports.getAllOptions = getAllOptions
exports.getOptionById = getOptionById
exports.updateOption = updateOption
exports.deleteOption = deleteOption
