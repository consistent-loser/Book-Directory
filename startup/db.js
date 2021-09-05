const mongoose = require('mongoose');
const winston = require('winston');

//---------------------------------------------------------------------------------------------------------//
//----------------------------------Establish Database connection------------------------------------------//
//---------------------------------------------------------------------------------------------------------//


module.exports = function() {
   // mongoose.connect('mongodb://localhost/Book-Directory')
     mongoose.connect('mongodb+srv://pustaq:1234@cluster0.xf7v6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => winston.info('Connected to the Database'))
}