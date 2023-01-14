//map object
const myMap = {
    
    coordinates: [],
    businesses: [],
    map: {},
    businessesMarkers: {},


    
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
        console.log(this.coordinates)
    },

    //create business markers
    businessMarkers(){
        for(let i = 0; i < this.businesses.length; i++){
            businessesMarkers = L.marker([this.businesses[i].posLat, this.businesses[i].posLong]).bindPopup(`${this.businesses[i].name}`).addTo(this.map)
        }
    }
    
    
}

//get coords geolocation api
async function  getCoords() {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [position.coords.latitude, position.coords.longitude]
}

//4square api fsq3W7lbQ9/kmVINE0wQTCsDRp3C9pUuAGoYo/eJEa9Xr8w=
async function fourSquare(business) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3yylPfnCkDq0apL05blbc5pKNbzVYhKdkJU8ytM0aanw=",
      },
    };

    let posLat = myMap.coordinates[0]
    let posLon = myMap.coordinates[1];

    let res = await fetch(
      `https://api.foursquare.com/v3/places/search?&query=${business}&ll=${posLat}%2C${posLon}&limit=5`,
      options
    )
    let data = await res.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results
    return businesses
}

function businessArray(data){
    let businesses = data.map((element) => {
        let location = {
            name: element.name,
            posLat: element.geocodes.main.latitude,
            posLong: element.geocodes.main.longitude
        }
        return location
    })
    console.log(businesses)
    return businesses //array of objects?
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
    let data = await fourSquare(business)
    console.log(data)
    myMap.businesses = businessArray(data)
    myMap.businessMarkers()
})

