const Joi = require('joi');
const express = require('express');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const mongo = require('./config/db');
const users = require('./routes/users');
const auth = require('./routes/auth');

// check if privateKey is defined (./config/custom-environmental-variables.json)
if (!config.get('privateKey')) {
    console.error('[ERROR]: privateKey is not defined.');
    process.exit(1);
}

// start connection to MongoDB
mongo.InitiateMongoServer;

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);


app.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001')
})

app.get('/', function(request, response){
    response.sendFile(__dirname + '/html/index.html');
});

app.get('/leaderboard/', function(request, response){
    response.sendFile(__dirname + '/html/leaderboard.html');
});

app.get('/contactus/', function(request, response){
    response.sendFile(__dirname + '/html/contactus.html');
});

app.get('/play/', function(request, response){
    response.sendFile(__dirname + '/html/play.html');
});

app.get('/account/signup/', function(request, response){
    response.sendFile(__dirname + '/html/signup.html');
});

app.get('/account/signin/', function(request, response){
    response.sendFile(__dirname + '/html/signin.html');
});

app.get('/account/reset/', function(request, response){
    response.sendFile(__dirname + '/html/reset.html');
});

module.exports = app;