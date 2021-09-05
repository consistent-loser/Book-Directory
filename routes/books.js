const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { book, validate } = require('../models/bookModel');
const asyncMiddleware = require('../middleware/async');



//-------------------------------------get book list present in the database----------------------------------//
router.get('/', asyncMiddleware(async (req, res) => {
        const result = await book.find();
        res.send(result);
    
}));

//---------------------------------------post new entry-------------------------------------------------------//

router.post('/', auth, asyncMiddleware(async (req,res) => {

    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(`Something happened\n ${error}`);
    }
    const books = new book ({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        inventory: req.body.inventory
    });

    const result = await books.save();
    res.send(result);
}));

//----------------------------------------Get single entry by ID---------------------------------------------//

router.get('/:id', asyncMiddleware(async (req,res) => {
    const result = await book.find({_id: req.params.id});

    if(result.length == 0){
        return res.status(404).send("Book not found");
    }

    res.send(result);
}));

// ------------------------------------------Update data --------------------------------------------------//

router.put('/:id',asyncMiddleware(async (req,res) => {
    let Book = await book.findOne({_id: req.params.id});
    if(!Book){
        res.status(400).send("Something went wrong");
    }
    if(req.body.author){
        Book.author = req.body.author;
    }
    if(req.body.name){
        Book.name = req.body.name;
    }
    if(req.body.price){
        Book.price = req.body.price;
    }
    if(req.body.inventory>=0){
        Book.inventory = req.body.inventory;
    }
    
    await Book.save();
    res.send(Book);
}));

//---------------------------------------detele record ---------------------------------------------------//
router.delete('/:id',asyncMiddleware(async (req,res) => {
    const result = await book.findByIdAndDelete(req.params.id);
    res.send(result);
}));


module.exports = router;