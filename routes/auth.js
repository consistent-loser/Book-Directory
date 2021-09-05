const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const {user, } = require('../models/userModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');


router.post('/', asyncMiddleware(async (req,res) => {

    const {error} = validate(req.body);

    if(error){
        return res.status(400).send(`Bad request ${error.message}`);
    }

    const details = await user.findOne({email: req.body.email});

    if(!details){
        return res.status(400).send("Invalid username or password email");
    }

    const valid = await bcrypt.compare(req.body.password,details.password);

    if(!valid){
       return res.status(400).send("Invalid username or password password");
    }

    const token = jwt.sign({id: details._id},config.get('jwtPrivateKey'));

    res.send(token);
}));

function validate(User){
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(5).max(500).required()
    });

    return schema.validate(User);
}

module.exports = router;