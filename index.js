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
  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8f9fa"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#5f6368"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dadce0"
        },
        {
          "weight": 0.8
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#9aa0a6"
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c8ced3"
        },
        {
          "weight": 0.6
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#9aa0a6"
        },
        {
          "weight": "0.5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e8f0fe"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e8eaed"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#5f6368"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#80868b"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9aa0a6"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d2e3fc"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9aa0a6"
        }
      ]
    }
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 36.8283, lng: -98.5795 },
    zoom: 5,
    styles: mapStyle,
    disableDefaultUI: false, // Set to true to remove all UI controls
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
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
          if (point['Link']) {
            infowindowContent.children.namedItem("place-job-name").innerHTML = `<a href="${point['Link']}" target="_blank">${point['Job Name']}</a>`;
          }
          infowindowContent.querySelector("#place-year-completed").textContent = point['Year Completed'];
          if (point['Status'] === 'Complete') {
            infowindowContent.children.namedItem("infowindow-item-year-completed").hidden = false;
          } else {
            infowindowContent.children.namedItem("infowindow-item-year-completed").hidden = true;
          }
          infowindowContent.children.namedItem("place-sector").textContent = point['Sector'];
          infowindowContent.children.namedItem("place-status").textContent = point['Status'];
          infowindowContent.children.namedItem("place-contractor").textContent = point['Contractor'];

          infowindow.open(map, marker);
        });

        markers.push(marker);
      }

      const markerCluster = new markerClusterer.MarkerClusterer({ map, markers, renderer });
    }
  });
}

window.initMap = initMap;
