// import express
const express = require('express');

// DB
const { db_connection } = require('./database/connection');

// use express
const app = express();

// API port definition
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(express.json());

// Limitations
app.all('*', function(req, res, next ) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/transactions',require('./routes/transaction'));

//Testing the db connn
try {
    const db_status = db_connection.authenticate();
    console.log("Connection has been established successfully");
} catch (error) {
    console.log("Unable to connect to the database.", error);
}

app.listen( app.get('port'), () => {
    console.log('Server running in port: ', app.get('port'));
})