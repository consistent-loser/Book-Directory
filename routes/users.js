const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { user, validate } = require('../models/userModel');
const asyncMiddleware = require('../middleware/async');
const router = express.Router();

router.get('/', asyncMiddleware(async (req,res) => {
    const result = await user.find();
    if(result.length == 0){
        return res.status(400).send("Something went wrong");
    }

    res.send(result);

}));

router.post('/', asyncMiddleware(async (req,res) => {

    const { error } = validate(req.body);

    if(error){
        return res.status(400).send(`Bad Request ${error.message}`);
    }

    const User = new user({
        fname: req.body.fname,
        email: req.body.email,
        isGold: req.body.isGold,
        password: req.body.password
    });

    if(req.body.lname){
        User.lname = req.body.lname;
    }

    await User.save();

    const token = jwt.sign({id: User._id},process.env.jwtPrivateKey); // config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(User);
}));

router.put('/:id', asyncMiddleware(async (req,res) => {
    const User = await user.findOne({_id: req.params.id});

    if(User.length==0){
        res.status(400).send("User: Something happened");
    }

    if(req.body.fname){
        User.fname = req.body.fname;
    }
    if(req.body.lname){
        User.lname = req.body.lname;
    }
    if(req.body.isGold){
        User.isGold = req.body.isGold;
    }
    if(req.body.password){
        User.password = req.body.password;
    }

    await User.save();
    res.send(User);
}));

router.get('/:id', asyncMiddleware(async (req,res)=> {
    const result = await user.find({_id: req.params.id});
    if(result.length==0){
        return res.status(404).send("User not found");
    }

    res.send(result);
}));

router.delete('/:id', asyncMiddleware(async (req,res) =>{
    const result = await user.findByIdAndDelete(req.params.id);

    res.send(result);
}));

module.exports = router;
