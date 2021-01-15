const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

// add method to the model
userSchema.methods.generateAuthToken = function (res) {
    const token = jwt.sign({_id: this._id}, config.get('privateKey'), {expiresIn: 3600}); // expires in 60 minutes
    return token;
};

// create user model
const User = mongoose.model('User', userSchema);
 
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;