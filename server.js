const Joi = require('joi');
const path = require('path');
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
mongo.InitiateMongoServer();

const app = express();
app.use(express.json());
app.disable('x-powered-by');
app.use('/user', users);
app.use('/auth', auth);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001')
})

app.get('/', function(request, response){
    response.sendFile(__dirname + '/html/index.html');
});

app.get('/leaderboard/', function(request, response){
    response.sendFile(__dirname + '/html/leaderboard.html');
});

app.get('/contact/', function(request, response){
    response.sendFile(__dirname + '/html/contact.html');
});

app.get('/play/', function(request, response){
    response.sendFile(__dirname + '/html/play.html');
});

app.get('/registration/', function(request, response){
    response.sendFile(__dirname + '/html/registration.html');
});

app.get('/login/', function(request, response){
    response.sendFile(__dirname + '/html/login.html');
});

app.get('/account/reset/', function(request, response){
    response.sendFile(__dirname + '/html/reset.html');
});

app.post('/guess', (req, res) => {
    //We will receive the latitude and longitude
    data = req.body;
    //For the moment the goal latitude and longitude is hardcoded
    const R = 6371000; // metres
    const phi1 = data.lat * Math.PI/180; // φ, λ in radians        ç
    const phi2 = data.latGoal * Math.PI/180;
    const dphi = (data.latGoal-data.lat) * Math.PI/180;
    const dlambda = (data.lngGoal-data.lng) * Math.PI/180;

    const a = Math.sin(dphi/2) * Math.sin(dphi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda/2) * Math.sin(dlambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    distance = {distance: d};
    res.json(distance);

});

module.exports = app;