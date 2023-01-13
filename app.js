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
            zoom: 12,
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

        
    //create business markers
    //businessMarkers(){}    
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
document.getElementById('submit').addEventListener('click', async (event) => {
    let business = document.getElementById('business').value
    console.log(business)

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3yylPfnCkDq0apL05blbc5pKNbzVYhKdkJU8ytM0aanw=",
      },
    };

    fetch(
      "https://api.foursquare.com/v3/places/search?query=xxx&ll=%20xxx&limit=5",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

})

//4square api fsq3W7lbQ9/kmVINE0wQTCsDRp3C9pUuAGoYo/eJEa9Xr8w=
