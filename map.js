// Map Box Token 
var API_Key = "access_token=pk.eyJ1Ijoibmljb2xlZHN0IiwiYSI6ImNsYTg3ZXg0bjAxMGUzcWwwNGR3ZW14Z2kifQ.3NvYTQplBocf26YEG-unPw"

// Map url
mapURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"

// URL links
var EarthQuakeURL = "https://services8.arcgis.com/ZhTpwEGNVUBxG9VW/arcgis/rest/services/earth_quake/FeatureServer/0"
var TectonicPlatesBoundaryURL = "https://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/TectonicPlateBoundaries/FeatureServer/0"

// Set basemap and zoom level
var outdoors_background = L.tileLayer(
  //"https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" + API_Key,
  mapURL,
  { minZoom: 3,
    attributionControl: false,
    attribution: '&copy; 2022 Christopher Buirski & Nicole Da Silva Trindade',
    transparent: true,
  }
);

// Set map extent
var map = L.map('map').setView([22.405087, -0.351560], 3);
map.setMaxBounds(map.getBounds());

// adding one 'outdoors' tile layer to the map.
outdoors_background.addTo(map);

// layers for two different sets of data, earthquakes and tectonicplates.
var tectonicplateboundaries = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// base layers
var baseMaps = {
  Basemap: outdoors_background
};

// overlays 
var overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plate Boundaries": tectonicplateboundaries
};

// control which layers are visible.
L.control.layers(baseMaps, overlayMaps).addTo(map);

earthquakes.addTo(map);
tectonicplateboundaries.addTo(map);

/*function getColor(d) {
  return d < 1 ? '#291ee1' :
         d < 2 ? '#0e8af1' :
         d < 3 ? '#0edcf1' :
         d < 4 ? '#29d688' :
         d < 5 ? '#1ae529' :
         d < 6 ? '#e2db1d' :
         d < 7 ? '#f0a60f' :
         d < 8 ? '#d97026':
         d < 9 ? '#ff2300' :
         d < 10 ? '#c73845' :
         '#150607';
  }*/

function getColor(d) {
  return d < 2 ? '#ffffd4' :
         d < 4 ? '#fee391' :
         d < 5 ? '#fec44f' :
         d < 6 ? '#fe9929' :
         d < 7 ? '#ec7014' :
         d < 8 ? '#cc4c02' :
         d > 8 ? '#8c2d04' :
         '#150607';
  }


// Earth Quake Points
var earthquakes1 = L.esri.featureLayer({
  url: EarthQuakeURL,
  pointToLayer: function (feature, latlng) {
    var circleMarker = L.circleMarker(latlng, {
      radius: 8,
      fillColor: getColor(feature.properties.magnitude),
      color: "#252525",
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    });
    return (circleMarker);
  }
}
).addTo(earthquakes);

// set pop ups for earth quakes
earthquakes1.bindPopup(function (layer) {
  return L.Util.template("<b>Magnitude: </b>{magnitude} <br><b>Depth: </b>{depth} km</br>  <b>Location: </b>{place}", layer.feature.properties);
});

// Add tectonic plate boundaries
var boundry = L.esri.featureLayer({ 
  url: TectonicPlatesBoundaryURL,
  style: function (feature) {
    var c;
    switch (feature.properties.Boundary_Type) {
      case 'Convergent':
        c = '#d7191c';
        w = 1;
        break;
      case 'Divergent':
        c = '#2b83ba';
        w = 1;
        break;
      case 'Transform':
        c = '#f3900c';
        w = 1;
        break;
      case 'Unknown':
        c = '#404040';
        w = 1;
        break;
    }
    //return { color: c, opacity: 0.65, weight: w };
    return { color: c, opacity: 1, weight: w };
  }
}).addTo(tectonicplateboundaries);

// set pop ups for earth quakes
boundry.bindPopup(function (layer) {
  return L.Util.template("<b>Magnitude: </b>{magnitude} <br><b>Depth: </b>{depth} km </br>  <b>Location: </b>{place}", layer.feature.properties);
});

var legendBounday = L.control({ position: "bottomright" });

legendBounday.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Tectonic Plate Boundary Type</h4>";
  div.innerHTML += '<i style="background: #d7191c"></i><span>Convergent</span><br>';
  div.innerHTML += '<i style="background: #2b83ba"></i><span>Divergent</span><br>';
  div.innerHTML += '<i style="background: #f3900c"></i><span>Transform</span><br>';
  div.innerHTML += '<i style="background: #404040"></i><span>Unknown</span><br>';

  return div;
};

legendBounday.addTo(map);

var legendQuakes = L.control({ position: "bottomleft"});

legendQuakes.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Description:</h4>";
  div.innerHTML += '<i style="background: #ffffd4"></i><span> < 2.0  <b>Micro</b> </span><br>';
  div.innerHTML += '<i style="background: #fee391"></i><span> 2.0 - 3.9 <b> Minor</b>  </span><br>';
  div.innerHTML += '<i style="background: #fec44f"></i><span> 4.0 - 4.9 <b>Light</b> </span><br>';
  div.innerHTML += '<i style="background: #fe9929"></i><span> 5.0 - 5.9 <b>Moderate</b> </span><br>';
  div.innerHTML += '<i style="background: #ec7014"></i><span> 6.0 - 6.9 <b>Strong</b> </span><br>';
  div.innerHTML += '<i style="background: #cc4c02"></i><span> 7.0 - 7.9 <b>Major</b> </span><br>';
  div.innerHTML += '<i style="background: #8c2d04"></i><span> > 8.0 <b>Great</b> </span><br>';
  //div.innerHTML += '<i style="background: #150607"></i><span>Unknown</span><br>';

  return div;
};

legendQuakes.addTo(map);

// Add this one (only) for now, as the Population layer is on by default

map.on('overlayadd', function (eventLayer) {
    // Switch to the Earthquake legend...
    if (eventLayer.name === 'Earthquakes') {
        this.removeControl(legendBounday);
        legendQuakes.addTo(this);
    } else { // Or switch to the Techtonic plates boundary legend...
        this.removeControl(legendQuakes);
        legendBounday.addTo(this);
    }
});