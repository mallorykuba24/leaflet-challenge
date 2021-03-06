// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map", {
    center: [10.52, -5.67],
    zoom: 3
  });
  
  // Add a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
   d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson', ({features})=>{
      console.log(d3.min(features.map(x=>x.geometry.coordinates[2])),d3.max(features.map(x=>x.geometry.coordinates[2])));

      features.forEach(obj => {
          var lat = obj.geometry.coordinates[1];
          var lng = obj.geometry.coordinates[0];
          var depth = obj.geometry.coordinates[2];
          var mag = obj.properties.mag;
          var place = obj.properties.place;

          L.circle([lat,lng],{
              radius: mag * 25000,
              color: 'black',
              fillColor: getColor(depth),
              fillOpacity: 1,
              weight: 1

          }).bindPopup(place+'<br>Magnitude: '+mag).addTo(myMap)
      });
  });

function getColor(depth) {
    
    switch (true) {
        case depth>100:
            return 'pink';
    
        case depth>60:
            return 'purple';
    
        case depth<61:
            return 'gold';
    
    }
}