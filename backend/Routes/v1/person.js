    const express = require('express');
const router = express.Router();

const personController = new (require('../../Controllers/v1/person'))();

// Retrieve all company
router.route('/').get(personController.list);

// Create a new company
router.route('/').post(personController.add);

// Retrieve a single company with id
router.route('/:id').get(personController.findOne);

// Update a company with id
router.route('/:id').put(personController.update);

// Delete a company with id
router.route('/:id').delete(personController.delete);

module.exports = router