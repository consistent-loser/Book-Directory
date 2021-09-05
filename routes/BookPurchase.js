const express = require ('express');
const router = express.Router();
const {book, } = require('../models/bookModel');
const { saleData } = require('../models/purchaseModel');
const asyncMiddleware = require('../middleware/async');
//---------------------------------------------- transaction-----------------------------------------------//
router.post('/', asyncMiddleware(async (req,res) => {
    const data = new saleData({
        buyerID: req.body.buyerID,
        bookID: req.body.bookID,
    });

    data.date = Date.now();

    const bookData = await book.findById(req.body.bookID);
    if(bookData.inventory>0){
        bookData.inventory = bookData.inventory - 1;
    }

    else{
        console.log(bookData.inventory);
        return res.status(400).send("Book Not Available");
    }

    
    try{
        const result = await data.save();
        await bookData.save();
        res.send(result);
    }
    catch(err){
        res.status(400).send(err.message);
    }
    
}));

//------------------------------view single user purchase---------------------------------------------//
router.get('/SearchByUser/:buyerID', asyncMiddleware(async (req,res) =>{
    const purchaseDetails = await saleData.find({buyerID: req.params.buyerID});

    if(purchaseDetails.length==0){
        res.send("No transaction found");
    }

    else{
        res.send(purchaseDetails);
    }
}));




module.exports = router;


