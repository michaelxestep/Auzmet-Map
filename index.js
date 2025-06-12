// This sample uses the Place Autocomplete widget to allow the user to search
// for and select a place. The sample then displays an info window containing
// the place ID and other information about the place that the user has
// selected.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
const renderer = {
  render: ({ count, position }) => {
    // Create a custom blue cluster marker
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="#1976D2" stroke="white" stroke-width="3"/>
        <text x="25" y="30" font-family="Arial" font-size="14" fill="white" text-anchor="middle" font-weight="bold">${count}</text>
      </svg>
    `;
    
    return new google.maps.Marker({
      position,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(50, 50)
      },
      label: {
        text: String(count),
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    });
  }
};

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 36.8283, lng: -98.5795 },
    zoom: 5,
  });

  const customIcon = {
    url: './map-pin.png',
    scaledSize: new google.maps.Size(40, 40), // Resize the icon
  };

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);

  Papa.parse('./data.csv', {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const markers = [];

      for (const point of data) {
        const marker = new google.maps.Marker({
          map: map,
          position: { lat: Number(point.Latitude), lng: Number(point.Longitude) },
          title: point['Job Name'],
          icon: customIcon
        });

        marker.addListener("click", () => {
          infowindowContent.children.namedItem("place-job-name").textContent = point['Job Name'];
          infowindowContent.children.namedItem("place-year-completed").textContent = point['Year Completed'];
          infowindowContent.children.namedItem("place-status").textContent = point['Status'];
          infowindowContent.children.namedItem("place-job-number").textContent = point['Job Number'];
          infowindowContent.children.namedItem("place-sector").textContent = point['Sector'];
          infowindowContent.children.namedItem("place-contractor").textContent = point['Contractor'];
          infowindowContent.children.namedItem("place-project-address").textContent = point['Project Address'];
          infowindowContent.children.namedItem("place-link").textContent = point['Link'];
          if (point['Link']) {
            infowindowContent.children.namedItem("place-link").hidden = false;
          } else {
            infowindowContent.children.namedItem("place-link").hidden = true;
          }

          infowindow.open(map, marker);
        });

        markers.push(marker);
      }

      const markerCluster = new markerClusterer.MarkerClusterer({ map, markers, renderer });
    }
  });

  
  // const input = document.getElementById("pac-input");
  // // Specify just the place data fields that you need.
  // const autocomplete = new google.maps.places.Autocomplete(input, {
  //   fields: ["place_id", "geometry", "formatted_address", "name"],
  // });

  // autocomplete.bindTo("bounds", map);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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
