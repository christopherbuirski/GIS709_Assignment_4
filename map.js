// Map Box Token 
var API_Key = "access_token=pk.eyJ1Ijoibmljb2xlZHN0IiwiYSI6ImNsYTg3ZXg0bjAxMGUzcWwwNGR3ZW14Z2kifQ.3NvYTQplBocf26YEG-unPw"

// URL links
var EarthQuakeURL = "https://services8.arcgis.com/ZhTpwEGNVUBxG9VW/arcgis/rest/services/earth_quake/FeatureServer/0"
var TectonicPlatesURL = "https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Tectonic_Plates_and_Boundaries/FeatureServer/1"
var TectonicPlatesBoundaryURL = "https://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/TectonicPlateBoundaries/FeatureServer/0"

// Set basemap and zoom level
var outdoors_background = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" + API_Key, 
  { attribution: '&copy; Christopher Buirski & Nicole Da Silva Trindade' },
  { minZoom: 3 } 
);

// Set map extent
var map = L.map('map').setView([22.405087, -0.351560], 3);
map.setMaxBounds(map.getBounds());

// adding one 'outdoors' tile layer to the map.
outdoors_background.addTo(map);

// layers for two different sets of data, earthquakes and tectonicplates.
var tectonicplates = new L.LayerGroup();
var tectonicplateboundaries = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// base layers
var baseMaps = {
  Outdoors: outdoors_background
};

// overlays 
var overlayMaps = {
  "Tectonic Plates": tectonicplates,
  "Tectonic Plate Boundaries": tectonicplateboundaries,
  "Earthquakes": earthquakes
};

// control which layers are visible.
L.control.layers(overlayMaps).addTo(map);

tectonicplateboundaries.addTo(map);
tectonicplates.addTo(map);
earthquakes.addTo(map);


const hikerIcon = L.icon({
  iconUrl: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
  iconSize: [18, 18]
});


// Earth Quake Points
var earthquakes = L.esri.featureLayer({ 
  url: EarthQuakeURL,
  pointToLayer: (geojson, latlng) => {
    return L.marker(latlng, {
      icon: hikerIcon
    });
  }
}).addTo(earthquakes);

// set pop ups for earth quakes
earthquakes.bindPopup(function (layer) {
  return L.Util.template("<b>Magnitude: </b>{magnitude} <br><b>Depth: </b>{depth}</br>  <b>Location: </b>{place}", layer.feature.properties);
});

// Add tectonic plate boundaries
L.esri.featureLayer({ 
  url: TectonicPlatesBoundaryURL,
  style: function (feature) {
    var c;
    switch (feature.properties.Boundary_Type) {
      case 'Convergent':
        c = '#d7191c';
        w = 5;
        break;
      case 'Divergent':
        c = '#2b83ba';
        w = 5;
        break;
      case 'Transform':
        c = '#404040';
        w = 3;
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

/*
// Tectonic Plates
L.esri.featureLayer({
  url: TectonicPlatesURL,
  simplifyFactor: 0.5,
  precision: 5,
  style: function (feature) {
    var c;
    switch (feature.properties.PlateName) {
      case 'Africa':
        c = '#d7191c';
        w = 5;
        break;
      case 'Divergent':
        c = '#2b83ba';
        w = 5;
        break;
      case 'Transform':
        c = '#404040';
        w = 3;
        break;
      case 'Unknown':
        c = '#404040';
        w = 1;
        break;
    }
    return { color: c, opacity: 1, weight: w };
  }
}).addTo(tectonicplates);*/

// Add Tectonic Plates Polygons
L.esri.featureLayer({
  url: TectonicPlatesURL,
  //simplifyFactor: 0.5,
  simplifyFactor: 1,
  precision: 5,
  style: function (feature) {
    if (feature.properties.PlateName === 'Africa') {
      return { color: 'blue', weight: 0 };
    }
    if (feature.properties.PlateName === 'Antarctica') {
      return { color: 'red', weight: 0 };
    } 
    if (feature.properties.PlateName === 'Somalia') {
      return { color: 'green', weight: 0 };
    }
    if (feature.properties.PlateName === 'India') {
      return { color: 'orange', weight: 0 };
    }
    if (feature.properties.PlateName === 'Australia') 
    { 
      return { color: 'brown', weight: 0 }; 
    }
    if (feature.properties.PlateName === 'Eurasia') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'North America') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'South America') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Nazca') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Pacific') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Arabia') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Sunda') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Timor') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Kermadec') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Tonga') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === "Niuafo'ou") {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Woodlark') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Maoke') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'South Bismarck') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Solomon Sea') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'North Bismarck') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'New Hebrides') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Caribbean') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Cocos') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Okhotsk') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Juan de Fuca') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Altiplano') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'North Andes') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Okinawa') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Philippine Sea') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Amur') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Caroline') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Mariana') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Futuna') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Scotia') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Shetland') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Aegean Sea') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Anatolia') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Yangtze') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Burma') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Rivera') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Birds Head') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Molucca Sea') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Banda Sea') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Manus') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Conway Reef') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Balmoral Reef') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Easter') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Juan Fernandez') {
      return { color: 'brown', weight: 0 };
    }
    if (feature.properties.PlateName === 'Galapagos') {
      return { color: 'brown', weight: 0 };
    }
  }
}).addTo(tectonicplates);
