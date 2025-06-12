// This sample uses the Place Autocomplete widget to allow the user to search
// for and select a place. The sample then displays an info window containing
// the place ID and other information about the place that the user has
// selected.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
  });

  const marker1 = new google.maps.AdvancedMarkerElement({
    map: map,
    position: { lat: -25.344, lng: 131.031 },
    title: "Uluru",
  });

  const marker2 = new google.maps.AdvancedMarkerElement({
    map: map,
    position: { lat: -27.344, lng: 132.031 },
    title: "Uluru2",
  });

  const markerCluster = new markerClusterer.MarkerClusterer({ map, [marker1, marker2] });
  // const input = document.getElementById("pac-input");
  // // Specify just the place data fields that you need.
  // const autocomplete = new google.maps.places.Autocomplete(input, {
  //   fields: ["place_id", "geometry", "formatted_address", "name"],
  // });

  // autocomplete.bindTo("bounds", map);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);

  // marker.addListener("click", () => {
  //   infowindow.open(map, marker);
  // });
  // autocomplete.addListener("place_changed", () => {
  //   infowindow.close();

  //   const place = autocomplete.getPlace();

  //   if (!place.geometry || !place.geometry.location) {
  //     return;
  //   }

  //   if (place.geometry.viewport) {
  //     map.fitBounds(place.geometry.viewport);
  //   } else {
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(17);
  //   }

  //   // Set the position of the marker using the place ID and location.
  //   // @ts-ignore This should be in @typings/googlemaps.
  //   marker.setPlace({
  //     placeId: place.place_id,
  //     location: place.geometry.location,
  //   });
  //   marker.setVisible(true);
  //   infowindowContent.children.namedItem("place-name").textContent = place.name;
  //   infowindowContent.children.namedItem("place-id").textContent =
  //     place.place_id;
  //   infowindowContent.children.namedItem("place-address").textContent =
  //     place.formatted_address;
  //   infowindow.open(map, marker);
  // });
}

window.initMap = initMap;
