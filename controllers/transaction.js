// Imports
const { TRANSACTION_SUCCESSFULLY_REGISTERED } = require('../utils/constants');

// Models
const { Transaction } = require ('../models/transaction');
const { User } = require ('../models/user');
const { generate } = require('../utils/id_generator');

// Controllers
const getTransactions = async(req, res) => {
   try {
        // find match with username
        console.log("headers: ", req.headers);
        const transaction = await Transaction.findAll(
            {
                where : {
                    trns_type : req.headers.type,
                    user_id : req.headers.user
                }
            },
            {
                attributes: ['trns_concept', 'trns_amount', 'trns_date']
            }
        );
        
        res.json(
            transaction
        );
   } catch (e) {
       console.log("Error> ", e);
       res
           .status(500)
           .json( SERVER_ERRROR );
   }
};


// Create user
const createTransaction = async(req, res) => {

    // Saving headers into local variables
    let key = req.headers.id;
    let type = req.headers.type;
    let amount = req.headers.amount;
    let concept = req.headers.concept;
    let date = new Date().toJSON().slice(0, 10);
    let user = req.headers.user;

    try {
        // Creating user in DB
        const transaction = await Transaction.create({
            trns_id: key = generate(key),
            trns_type: type,
            trns_amount: amount,
            trns_concept: concept,
            trns_date: date,
            user_id: user
        });
        res.json(
            {
                message: TRANSACTION_SUCCESSFULLY_REGISTERED
            }
        );
    } catch (e) {
        console.log("Error", e);
       res
           .status(500)
           .json(
                {
                    message: "No se puedo crear el hecho económico."
                }
            );
    }
};

module.exports = {
    getTransactions,
    createTransaction
};