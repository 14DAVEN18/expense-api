// Imports
const { INVALID_PASSWORD, USER_DOES_NOT_EXIST, CREDENTIALS_SUCCESSFULLY_VALIDATED } = require('../utils/constants');

const bcrypt = require('bcrypt');

// Models
const { User } = require ('../models/user');
const { Authentication } = require ('../models/authentication');
const { generate } = require('../utils/id_generator');

// Controllers
const loginUser = async(req, res) => {
    try {

        // find match with username
        const user = await User.findOne( { where: { user_username : req.headers.username } } );

        let isMatch = false;

        if (user) {
            // search auth_id in DB
            const authentication = await Authentication.findByPk(user.dataValues.auth_id);
            
            if (authentication) {
                // Get hash from DB
                const hash = authentication.dataValues.auth_password;

                // Compare password from user to passwor in DB
                isMatch = await bcrypt.compare(req.headers.password, hash)
                if (isMatch) {
                    console.log("if match")
                    res.json(
                        {
                            message: CREDENTIALS_SUCCESSFULLY_VALIDATED,
                            user_id: user.user_id,
                            user_username: user.user_username,
                            isMatch: isMatch
                        }
                    )
                } else {
                    res.json(
                        {
                            message: INVALID_PASSWORD,
                            isMatch: isMatch
                        }
                    )
                }
            } 
        } else {
            res.json(
                { 
                    message: USER_DOES_NOT_EXIST,
                    isMatch: isMatch
                }
            );
        }
    } catch (e) {
       console.log("Error: ", e);
       res
           .status(500)
           .json( USER_DOES_NOT_EXIST );
    }
};


// Create user
const createUser = async(req, res) => {

    // Key used to created user ID
    let key2 = 2; 

    // Saving headers into local variables
    let key = req.headers.id;
    let email = req.headers.email;
    let username = req.headers.username;
    let auth = req.headers.auth;

    try {

        // Hashing password
        const hash = await bcrypt.hash(auth, 13);

        // Creating password in DB
        const authentication = await Authentication.create({
            auth_id: key = generate(key),
            auth_password: hash
        }) 
        //console.log(authentication);

        // Creating user in DB
        const user = await User.create({
            user_id: key2 = generate(key2),
            user_email_address: email,
            user_username: username,
            auth_id: key
        });
        res.json(
            { message: "El usuario se creó correctamente" }
        );
    } catch (e) {
        console.log("Error", e);
       res
           .status(500)
           .json( SERVER_ERRROR );
    }
};

module.exports = {
    loginUser,
    createUser
};