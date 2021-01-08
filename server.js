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

