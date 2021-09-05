const express = require('express');
const home = require('../routes/home');
const books = require('../routes/books');
const users = require('../routes/users');
const transact = require('../routes/BookPurchase');
const auth = require('../routes/auth');
const error = require('../middleware/error');
//-------------------------------------------------------------------------------------------------------//
//-----------------------------------------------Routes--------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/books', books);
    app.use('/api/users', users);
    app.use('/api/transaction', transact);
    app.use('/api/auth',auth);

//----------error handler-------------//
    app.use(error);
}