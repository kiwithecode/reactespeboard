const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesorController');  // Adjust the path as needed

// Login route
router.post('/login', profesorController.login);

module.exports = router;