const express = require('express');
const { login, register } = require("../controllers/authController")
const router = express.Router();

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

module.exports = router;
