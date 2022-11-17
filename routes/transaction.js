// Requires
const { Router } = require('express');
const express  = require('express');

// Controllers
const {
    getTransactions, createTransaction
} = require('../controllers/transaction');

// Initializing
const router = express.Router();

// Routes
// GET
router.get('/transactions', getTransactions);

//
router.post('/transactions', createTransaction);

module.exports = router;