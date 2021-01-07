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
    response.sendFile('index.html', options);
});

app.get('/leaderboard/', function(request, response){
    response.sendFile('leaderboard.html', options);
});

app.get('/contactus/', function(request, response){
    response.sendFile('contactus.html', options);
});

app.get('/play/', function(request, response){
    response.sendFile('play.html', options);
});

app.get('/account/signup/', function(request, response){
    response.sendFile('signup.html', options);
});

app.get('/account/signin/', function(request, response){
    response.sendFile('signin.html', options);
});

app.get('/account/reset/', function(request, response){
    response.sendFile('reset.html', options);
});

