const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },

    lname: {
        type: String,
        minlength: 3,
        maxlength: 100,
    },

    email: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true

    },

    password: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },

    isGold: {
        type: Boolean,
        required: true
    }
});
//-------------------------------Hash password before saving into the database-----------------------//

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }
    catch(err){
        next(err);
    }
});
//----------------------------------------------------------------------------------------------------//
const User = mongoose.model('User',userSchema);

function validate(user){
    const schema = Joi.object({
        fname: Joi.string().min(5).max(100).required(),
        lname: Joi.string().min(5).max(100),
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean().required()
    }); 

    return schema.validate(user);
}

exports.user = User;
exports.validate = validate;