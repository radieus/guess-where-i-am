var map = L.map('guess-map').setView([52.22992817667709, 21.00809365510941], 0.5);
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
var coords;
var polyline;
var solution;

async function getData(url){
    const response = await fetch(url);
    return response.json();
}

async function roundSkip() {
    //To give the user 0 points we POST to /skip
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    fetch('/skip', options)
    .then((response) => response.json())
    .then((responseJSON) =>{
        console.log(responseJSON);
        alert("You skipped a round so you don't win any points!");
        if(responseJSON.redirect == true){
            alert("Your final score is: " + pointsAccumulated);
            //We redirect to the home screen
            window.location.href = window.location.href.substring(0, window.location.href.length - 6);
        }
    })
    .catch((err)=> console.log(err));


    //First we update the round counter
    coords = await getData('/goal'); 
    console.log(coords);
    panorama.setPosition({lat: parseFloat(coords.lat), lng: parseFloat(coords.lng)});
}

function onMapClick(result) {
    if(solution){
        map.removeLayer(solution);
    }
    if(polyline){
        map.removeLayer(polyline);
    }

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

    if(solution){
        map.removeLayer(solution);
    }
    if(polyline){
        map.removeLayer(polyline);
    }

    if(roundsPlayed >= 3){
        alert('You already played the 3 rounds!');
        return;
    }
    // This function will do the following steps:
    // Check if the marker which reflects the user's choice exists
    if(!guessMarker){
        alert("You didn't enter a guess!");
        return;
    }

    //First we get the goal latitude and longitude by doing a GET request to the server
    coords = await getData('/goal/get');
    //We will display in the map the two markers with a polyline joining them
    solution = L.marker([coords.lat, coords.lng], {
        draggable:true,
        title:"Resource location",
        alt:"Resource Location",
        riseOnHover:true
        }).addTo(map);

    //We will extract the latitude and longitude of the marker
    var guessLatLng = guessMarker.getLatLng();
    var lat = guessLatLng.lat;
    var lng = guessLatLng.lng;

    var pointA = new L.LatLng(coords.lat, coords.lng);
    var pointB = new L.LatLng(lat, lng);
    var pointList = [pointA, pointB];
    
    polyline = new L.Polyline(pointList, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    polyline.addTo(map);

    //Now this will be sent to the server via a POST request

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
        },
        body: JSON.stringify(data)
    };

    // Now let's do the fetch request 
    fetch('/guess', options)
        .then((response) => response.json())
        .then((responseJSON) => {
            // do stuff with responseJSON here...
            alert("You scored: "+responseJSON.points+ " from being "+ responseJSON.distance+ " kilometers away");
            pointsAccumulated += responseJSON.points;
            if(responseJSON.redirect == true){
                //We show the user his final score
                alert("Your final score is: " + pointsAccumulated);
                //We redirect to the home screen
                window.location.href = window.location.href.substring(0, window.location.href.length - 6);
            }
        }).catch((err) => console.log(err));

    // Next round 
    // We change the latitude and longitude of the panorama
    coords = await getData('/goal');
    panorama.setPosition({lat: parseFloat(coords.lat), lng: parseFloat(coords.lng)});

}

map.on('click', onMapClick);


