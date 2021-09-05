const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 250,
        required: true
    },
    author: {
        type: String,
        minlength: 3,
        maxlength: 250
    },
    price: {
        type: Number,
        min: 0,
        max: 1000,
        required: true
    },
    inventory: {
        type: Number,
        min: 0,
        max: 1000,
        required: true
    },

});

const Book = mongoose.model('Book', bookSchema);

function validate(Book) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(250).required(),
        author: Joi.string().min(3).max(250),
        price: Joi.number().min(0).max(1000).required(),
        inventory: Joi.number().min(0).max(1000).required()
    });

    return schema.validate(Book);
}

exports.book = Book;
exports.validate = validate;

