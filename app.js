//map object
const myMap = {
    
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},


    
    //create map
    createMap(){ 
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 11,
        })
        //add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        //create user marker
        const userMarker = L.marker(this.coordinates)
        userMarker.addTo(this.map).bindPopup('<b>You are here!</b>').openPopup()
    }

        
    //create markers
    //createMarkers()    
}

//get coords geolocation api
async function  getCoords() {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [position.coords.latitude, position.coords.longitude]
}

//event handlers
//window load
window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.createMap()
    
}
//POI submuit button
document.getElementById('submitBtn').addEventListener('click', (event) =>{
    event.preventDefault()
    let business = document.getElementById('POIs').value
    console.log(business)
}) 