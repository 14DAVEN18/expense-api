// Imports
const { TRANSACTION_SUCCESSFULLY_REGISTERED, NO_TRANSACTIONS_LISTED, TRANSACTION_NOT_CREATED } = require('../utils/constants');

// Models
const { Transaction } = require ('../models/transaction');
const { generate } = require('../utils/id_generator');
const { getDate } = require('../utils/date_handler');
const { Op } = require("sequelize");

// get savings
const getTransactions = async(req, res) => {
    let type = req.query.type;
    let user = req.query.user;
    let year = req.query.year;
    let month = req.query.month;
    if (req.query.type == 'saving') {
        try {
            // find match with username
            const transaction = await Transaction.findAll(
                {
                    where : {
                        trns_type : type,
                        user_id : user
                    }
                },
                {
                    attributes: ['trns_concept', 'trns_amount']
                }
            );
            res.json(
                transaction
            );
        } catch (e) {
           console.log("Error> ", e);
           res
               .status(500)
               .json( NO_TRANSACTIONS_LISTED );
        }
    } else {
        let date = getDate(year, month)
        try {
            
            // find match with username
            const transaction = await Transaction.findAll(
                {
                    where : {
                        trns_type : req.query.type,
                        trns_date : {
                            [Op.gte] : (year+"-"+month+"-01"),
                            [Op.lte] : date
                        },
                        user_id : req.query.user
                    }
                },
                {
                    attributes: ['trns_concept', 'trns_amount']
                }
            );
            
            res.json(
                transaction
            );
        } catch (e) {
           console.log("Error> ", e);
           res
               .status(500)
               .json( NO_TRANSACTIONS_LISTED );
        }
    }
};


// Create transaction
const createTransaction = async(req, res) => {

    // Saving headers into local variables
    let key = req.headers.key;
    let type = req.headers.type;
    let amount = req.headers.amount;
    let concept = req.headers.concept;
    let date = new Date().toJSON().slice(0, 10);
    let user = req.headers.user;

    let trns_id = generate(key);

    try {
        // Creating user in DB
        const [transaction, created] = await Transaction.findOrCreate({
            where: { trns_id : trns_id },
            defaults: {
                trns_id: trns_id,
                trns_type: type,
                trns_amount: amount,
                trns_concept: concept,
                trns_date: date,
                user_id: user
            }
        });
        res.json(
            {
                transaction: transaction,
                created: true
            }
        );
    } catch (e) {
        console.log("Error", e);
       res
           .status(500)
           .json(
                {
                    message: TRANSACTION_NOT_CREATED
                }
            );
    }
};

module.exports = {
    getTransactions,
    createTransaction
};