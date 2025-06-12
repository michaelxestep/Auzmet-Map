// main.js
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MarkerUtils } from "@googlemaps/markerclusterer/marker-utils.js";

const MAP_ID = "DEMO_MAP_ID";
const DEFAULT_KEY = "AIzaSyAlCk-atEVMbumOwpDHnUKSos9djbzuEpU";


const tress = [
  {
    "geometry": {
      "type": "Point",
      "coordinates": [-73.84421521958048, 40.723091773924274]
    },
    "status": "Alive",
    "health": "Fair",
    "spc_common": "red maple"
  },
  {
    "geometry": {
      "type": "Point",
      "coordinates": [-73.81867945834878, 40.79411066708779]
    },
    "status": "Alive",
    "health": "Fair",
    "spc_common": "pin oak"
  },
];

const mapOptions = {
  center: { lat: 40.7128, lng: -73.85 },
  zoom: 12,
  mapId: MAP_ID,
};

new Loader(getLoaderOptions()).load().then(() => {
  const element = document.getElementById("map");
  const map = new google.maps.Map(element, mapOptions);
  
  const markers = trees.map(({ geometry }) =>
    createMarker(map, geometry.coordinates[1], geometry.coordinates[0])
  );
  
  const markerCluster = new MarkerClusterer({
    markers,
  });
  
  markerCluster.setMap(map);
});

const getLoaderOptions = () => ({
  apiKey: localStorage.getItem("gmaps-key") ?? DEFAULT_KEY,
  version: "weekly",
  libraries: ["marker"],
});

// helper function to keep maps in sync
const sync = (...maps) => {
  let center;
  let zoom;
  
  function update(changedMap) {
    maps.forEach((m) => {
      if (m === changedMap) {
        return;
      }
      m.setCenter(center);
      m.setZoom(zoom);
    });
  }
  
  maps.forEach((m) => {
    m.addListener("bounds_changed", () => {
      const changedCenter = m.getCenter();
      const changedZoom = m.getZoom();
      
      if (changedCenter !== center || changedZoom !== zoom) {
        center = changedCenter;
        zoom = changedZoom;
        update(m);
      }
    });
  });
};

// Creates a marker.
//
// Prefers advanced markers when they are available.
function createMarker(map, lat, lng) {
  if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
    return new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat, lng },
    });
  }
  
  return new google.maps.Marker({
    position: { lat, lng },
    map,
  });
}