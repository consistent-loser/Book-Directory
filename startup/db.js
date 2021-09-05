const mongoose = require('mongoose');
const winston = require('winston');

//---------------------------------------------------------------------------------------------------------//
//----------------------------------Establish Database connection------------------------------------------//
//---------------------------------------------------------------------------------------------------------//


module.exports = function() {
    mongoose.connect('mongodb://localhost/Book-Directory')
    .then(() => winston.info('Connected to the Database'))
}