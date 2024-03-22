const express = require('express');
const router = express.Router();

const companyController = new (require('../../Controllers/v1/company'))();

// Retrieve all company
router.route('/').get(companyController.list);

// Create a new company
router.route('/').post(companyController.add);

// Retrieve a single company with id
router.route('/:id').get(companyController.findOne);

// Update a company with id
router.route('/:id').put(companyController.update);

// Delete a company with id
router.route('/:id').delete(companyController.delete);

module.exports = router