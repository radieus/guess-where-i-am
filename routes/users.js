const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // validate the request first
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That email is already taken.');
    } else {
        // pick values of those keys from the body (lodash)
        user = new User(_.pick(req.body, ['username', 'email', 'password']));

        // generate salt and bcrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        // send token in the header in the response
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
});
 
module.exports = router;