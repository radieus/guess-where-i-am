let panorama;

function initialize() {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: { lat: 52.22992817667709, lng: 21.00809365510941 },
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