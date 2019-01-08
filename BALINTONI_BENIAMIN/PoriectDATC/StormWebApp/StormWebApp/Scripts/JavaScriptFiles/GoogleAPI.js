function initMap(Model) {

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });


    var heatmapData = [
        { location: new google.maps.LatLng(45.76046, 21.225), weight: 10 },
        new google.maps.LatLng(45.76046, 21.225),
        { location: new google.maps.LatLng(45.76046, 21.2251), weight: 25 },
        { location: new google.maps.LatLng(45.76046, 21.226), weight: 100 },
        { location: new google.maps.LatLng(45.76046, 21.224), weight: 150 }
    ];

    var parcBotanic = new google.maps.LatLng(45.76046, 21.225);

    map = new google.maps.Map(document.getElementById('map'), {
        center: parcBotanic,
        zoom: 16,
    });

    //   heatmap.setMap(map);

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function (event) {
        // Add marker
        addMarker({ coords: event.latLng });
    });



    // Array of markers
    var markers = [
        {
            coords: { lat: 45.76046, lng: 21.2251 },
            iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            content: '<h1>Parc Botanic</h1>'
        }
    ];

    // Loop through markers
    for (var i = 0; i < markers.length; i++) {
        // Add marker
        addMarker(markers[i]);
    }

    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon:props.iconImage
        });

        // Check for customicon
        if (props.iconImage) {
            // Set icon image
            marker.setIcon(props.iconImage);
        }

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }

}




//<script>
//    function initMap() {
//            var heatmapData = [
//                {location: new google.maps.LatLng(45.76046, 21.225), weight: 10 },
//                new google.maps.LatLng(45.76046, 21.225),
//                {location: new google.maps.LatLng(45.76046, 21.2251), weight: 25 },
//                {location: new google.maps.LatLng(45.76046, 21.226), weight: 100 },
//                {location: new google.maps.LatLng(45.76046, 21.224), weight: 150 }
//            ];

//            var parcBotanic = new google.maps.LatLng(45.76046, 21.225);

//            map = new google.maps.Map(document.getElementById('map'), {
//        center: parcBotanic,
//                zoom: 16,
//            });

//            var heatmap = new google.maps.visualization.HeatmapLayer({
//        data: heatmapData
//            });
//            heatmap.setMap(map);
//        }
//    </script> 

// GOOGLE MAPS API KEY => AIzaSyCeBrzsotmd8hGyxSeaFXiiOM_kfL2nnm4