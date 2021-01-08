const express = require('express');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001')
})
app.use(express.static('public'));
app.use(express.json());
var options = { 'root' : '/Users/radieus/Desktop/guess-where-i-am/html/' };

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

