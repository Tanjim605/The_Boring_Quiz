const express = require('express')
const optionController = require('../controllers/option-controller')

const router = express.Router()

router.post('/', optionController.createOption);

router.get('/', optionController.getAllOptions)

router.get('/:id', optionController.getOptionById);

router.put('/:id', optionController.updateOption);

router.delete('/:id', optionController.deleteOption);

module.exports = router
