// Requires
const { Router } = require('express');
const express  = require('express');

// Controllers
const {
    loginUser, createUser
} = require('../controllers/user');

// Initializing
const router = express.Router();

// Routes
// POST
router.post('/user', loginUser);

router.post('/users', createUser);

module.exports = router;