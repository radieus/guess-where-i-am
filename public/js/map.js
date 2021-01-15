var map = L.map('guess-map').setView([52.22992817667709, 21.00809365510941], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmFkaWV1cyIsImEiOiJja2dmNjNneTAwdWxwMnZxejY1aGRkdm03In0.FS9_5BuYbcxDQWSTseVO3A'
    }).addTo(map);

var guessMarker;
var pointsAccumulated = 0;
var roundsPlayed = 0;

async function getData(url){
    const response = await fetch(url);
    return response.json();
}

function skipRound() {
    if(roundsPlayed >= 3){
        alert('All rounds played already!');
    }
    //If the user skips we give him 0 points
    //First we update the round counter
    roundsPlayed++;

    if(roundsPlayed == 3){
        alert('You finished the game with THIS score!');
    }

    
}

function onMapClick(result) {

    if (guessMarker){
        map.removeLayer(guessMarker);
    }

    var marker = L.marker(result.latlng, {
        draggable:true,
        title:"Resource location",
        alt:"Resource Location",
        riseOnHover:true
        })
        .addTo(map);

    guessMarker = marker;

}

async function makeGuess(){
    if(roundsPlayed >= 3){
        alert('You already played the 3 rounds!');
        return;
    }
    //This function will do the following steps:
    //Check if the marker which reflects the user's choice exists
    if(!guessMarker){
        alert("You didn't enter a guess!");
        return;
    }
    //First we get the goal latitude and longitude by doing a GET request to the server
    var coords = await getData('/goal/get');
    //We will extract the latitude and longitude of the marker
    var guessLatLng = guessMarker.getLatLng();
    var lat = guessLatLng.lat;
    var lng = guessLatLng.lng;
    //Now this will be sent to the server via a POST request
     //Now that we have the 3 words we have to do another request to /slotmachine/saveresult to try to save this result and check its validity
    data = {
        lat: lat,
        lng: lng,
        latGoal: coords.lat, 
        lngGoal: coords.lng
    };
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Auth-Token': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    };

    //Now let's do the fetch request 
    fetch('/guess', options)
        .then((response) => response.json())
        .then((responseJSON) => {
            // do stuff with responseJSON here...
            console.log(responseJSON);
            alert(responseJSON.points);
            pointsAccumulated += responseJSON.points;
        }).catch((err) => console.log(err));

    //TODO: Calculate the points based on the distance from the point

    //Next round 
    //We change the latitude and longitude of the panorama
    coords = await getData('/goal'); 
    console.log(coords);
    panorama.setPosition({lat: parseFloat(coords.lat), lng: parseFloat(coords.lng)})
    roundsPlayed++;

    //If the user has already played 3 rounds we will display a message with his points
    if(roundsPlayed == 3){
        alert(`Congratulations! Your score is ${pointsAccumulated} points!`);
        //We send the points with the username to the server
        // data = {
        //     user: ,
        //     points: pointsAccumulated
        // };
        // options = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // };
    
        return;
    }
}

map.on('click', onMapClick);


