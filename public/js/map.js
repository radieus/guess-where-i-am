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

function makeGuess(){
    //This function will do the following steps:
    //Check if the marker which reflects the user's choice exists
    if(!guessMarker){
        alert("You didn't enter a guess!");
        return;
    }
    //We will extract the latitude and longitude of the marker
    var guessLatLng = guessMarker.getLatLng();
    var lat = guessLatLng.lat;
    var lng = guessLatLng.lng;
    //Now this will be sent to the server via a POST request
     //Now that we have the 3 words we have to do another request to /slotmachine/saveresult to try to save this result and check its validity
     data = {
        lat: lat,
        lng: lng,
        latGoal: 52.22992817667709, 
        lngGoal: 21.00809365510941 
    };
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    //Now let's do the fetch request 
    fetch('/guess', options)
        .then((response)=>{
            console.log(response.text());
        }).catch((err)=> console.log(err));

}

map.on('click', onMapClick);


