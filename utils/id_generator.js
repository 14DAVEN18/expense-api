// Object arary for different objects int he system
const object_prefix = [
    {
        key : 1,
        value: "auth_"
    },
    {
        key : 2,
        value: "user_"
    },
    {
        key : 3,
        value: "trns_"
    }
];

// Generates a random 25 characters long id for a given object
// - key: number to look up into the object_prefix array
function generate(key) {
    // object_id: will store the object id
    var object_id = "";

    // Loops through the object_prefix to get the right prefix for the object id
    object_prefix.forEach(prefix => {
        if (key < 1 || key > object_prefix.length)
            return null;
        else {
            if (prefix.key == key) {
                object_id += prefix.value;
            }
        }
    });

    // Possible characters to use in an object id
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Length of the string of possible charactes 
    const charactersLength = characters.length;
    // Concats 20 random characters to object_id from the characters array
    for (var i = 0; i < 20; i++) {
        object_id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return object_id;
}


module.exports = {
    generate
};