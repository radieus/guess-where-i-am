const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxac71ea9966cb44e08935e27d99c158f4.mailgun.org';
const mg = mailgun({apiKey: "b9381c4f2f8c6b8d2a93a47c4ff4f631-ba042922-d7c21955", domain: DOMAIN});
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
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
    res.cookie('token', accessToken, {httpOnly: false})
    res.redirect('/');
});

router.put('/forgotpassword', async (req, res) => {
    const {email} = req.body;

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('User with this email does not exist.');
    }

    const forgotPasswordToken = user.generateForgotPasswordToken();
    const data = {
        from: 'whereiamguess@gmail.com',
        to: email,
        subject: 'Guess Where I Am: Password reset link',
        html:`
            <h2>Please click on the given link to reset your password</h2>
            <p>${user._id}/resetpassword/${forgotPasswordToken}</p>
            `
        };

        return user.updateOne({resetLink: forgotPasswordToken}, (err, success) => {
            if (err){
                return res.status(400).send("Reset password link error");
            } else {
                mg.messages().send(data, function (error, body) {
                    if(error) {
                        return res.json({
                            error: err.message
                        })
                    }
                    return res.send('Password reset link has been sent!')
                });
            }
        })
    });


router.put('/resetpassword', async (req, res) => {
    const {email} = req.body;

    const {resetLink, newPass} = req.body;

    if (resetLink) {
        jwt.verify(resetLink,)
    } else {
        return res.status(401).send('Authentication error!');
    }

    
    });
 
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
 
    return schema.validate(req);
}
 
module.exports = router;