const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
 
router.post('/', async (req, res) => {
 
    // validate the request first
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    //  find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
 
    // check if the credentials in MongoDB match those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    
    // respond with JWT upon successful login
    const accessToken = user.generateAuthToken();
    res.cookie('token', accessToken, {expires: new Date(Date.now() + 9999999), httpOnly: false})
    res.redirect('/');
});
 
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
 
    return schema.validate(req);
}
 
module.exports = router;