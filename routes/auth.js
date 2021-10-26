require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox63a5522413794dae8922ae73ca7c196f.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: DOMAIN});
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
        from: 'guesswhereiam346@gmail.com',
        to: email,
        subject: 'Guess Where I Am: Password reset link',
        html:`
            <h2>Please click on the given link to reset your password</h2>
            <p>${process.env.CLIENT_URL}auth/reset/${forgotPasswordToken}</p>
            `
        };

        return user.updateOne({resetLink: forgotPasswordToken}, (err, success) => {
            if (err){
                return res.status(400).send("Reset password link error");
            } else {
                mg.messages().send(data, function (error, body) {
                    if(error) {
                        return res.json({
                            error: error.message
                        })
                    }
                    return res.send('Password reset link has been sent!')
                });
            }
        })
    });


router.put('/reset/:id', async (req, res) => {
    const newPass = req.body.password;
    const resetLink = req.params.id;

    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {
            if (err) {
                return res.status(400).send('Incorrect or expired token!')
            }
            User.findOne({resetLink}, async (err, user) => {
                if (err | !user) {
                    return res.status(400).send('User with this token does not exist!')
                } 

                const salt = await bcrypt.genSalt(10);
                let hashedPass = await bcrypt.hash(newPass.toString(), salt);
                const obj = {
                    password: hashedPass,
                    resetLink: ''
                }

                user = _.extend(user, obj);
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).send('Reset password error!');
                    }
                    else {
                        return res.status(200).send('Your password has been changed!');
                    }
                })
            })
        })
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
