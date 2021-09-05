const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try{
        res.send("Welcome to the Book Directory");
    }
    catch(err){
        res.status(500).send("something went wrong");
    }
    
});
module.exports = router;