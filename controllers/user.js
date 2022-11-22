// Imports
const { INVALID_PASSWORD, USER_NOTE_CREATED, USER_DOES_NOT_EXIST, CREDENTIALS_SUCCESSFULLY_VALIDATED } = require('../utils/constants');
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

        let isMatch = 0;

        if (user) {
            // search auth_id in DB
            const authentication = await Authentication.findByPk(user.dataValues.auth_id);
            
            if (authentication) {
                // Get hash from DB
                const hash = authentication.dataValues.auth_password;

                // Compare password from user to passwor in DB
                isMatch = await bcrypt.compare(req.headers.password, hash)
                console.log("isMatch: " , isMatch)
                if (isMatch) {
                    console.log("message: " , CREDENTIALS_SUCCESSFULLY_VALIDATED)
                    res.json(
                        {
                            user_id: user.user_id,
                            user_username: user.user_username,
                            isMatch: 2
                        }
                    )
                } else {
                    res.json(
                        {
                            message: INVALID_PASSWORD,
                            isMatch: 1
                        }
                    )
                }
            } 
        } else {
            res.json(
                { 
                    message: USER_DOES_NOT_EXIST,
                    isMatch: 0
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
    let key = req.headers.key;
    let email = req.headers.email;
    let username = req.headers.username;
    let auth = req.headers.password;

    let auth_id = generate(key)

    
    try {

        // Hashing password
        const hash = await bcrypt.hash(auth, 13);

        // Creating password in DB
        const [authentication, authCreated] = await Authentication.findOrCreate({
            where: { auth_id: auth_id },
            defaults: {
                auth_id: auth_id,
                auth_password: hash
            }
        })


        // Creating user in DB
        let user_id = generate(key2)
        const [user, created] = await User.findOrCreate({
            where: { user_id: user_id },
            defaults: {
                user_id: user_id,
                user_email_address: email,
                user_username: username,
                auth_id: authentication.auth_id
            }
        });
        res.json(
            { 
                created: created,
                message: "El usuario se creó correctamente"
            }
        );
    } catch (e) {
        console.log("Error", e);
       res
           .status(500)
           .json( {
                created: false,
                message: USER_NOTE_CREATED
            });
    }
};

module.exports = {
    loginUser,
    createUser
};