let panorama;
var panoramaCoords;

async function getData(url){
    const response = await fetch(url);
    return response.json();
}

async function initialize() {
    //Firstly we get the random coordinates from the server by doing a GET request to /goal
    panoramaCoords = await getData('/goal');
    console.log(panoramaCoords);

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: { lat: parseFloat(panoramaCoords.lat), lng: parseFloat(panoramaCoords.lng) },
            linksControl: false,
            panControl: false,
            enableCloseButton: false,
            fullscreenControl: false,
            addressControl: false,
            showRoadLabels: false,
            pov: { heading: 165, pitch: 0 },
            zoom: 0,
        },
        
    );
}
