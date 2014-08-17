$(function() {

    var latitude = 41.8337329;
    var longitude = -87.7321555;

    var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 12
    };

    var map = initialize(mapOptions);
    var infowindow = new google.maps.InfoWindow();
    var marker = "";
    var unfilled_markers = [];
    var filled_markers = [];

    function makeInfoWindowEvent(map, infowindow, contentString, marker) {
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
    }


    $.ajax({
        url: "/potholes.json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].completion_date === null) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                        map: map,
                        icon: '/assets/red_MarkerA.png'
                    });
                    makeInfoWindowEvent(map, infowindow, "Reported on: " + data[i].creation_date + "<br>" + "Street Address: " + data[i].street_address, marker);
                    unfilled_markers.push(marker);
                } else {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                        map: map,
                        icon: '/assets/green_MarkerA.png'
                    });
                    makeInfoWindowEvent(map, infowindow, "Reported on: " + data[i].creation_date + "<br>" + "Completed Date: " + data[i].completion_date + "<br>" + "Street Address: " + data[i].street_address, marker);
                    filled_markers.push(marker);
                }
            }
        },
        dataType: "json"
    });

    $(document).ajaxSuccess(function() {});

    google.maps.event.addListener(map, 'click', function(event) {
        infowindow.close();
    });



    $("#filled").on('click', function() {
        if ($("#filled").prop("checked")) {
            console.log("this is checked");
            for (var i = 0; i < filled_markers.length; ++i) {
                filled_markers[i].setVisible(false);
            }
        } else {
            console.log("this is unchecked");
            for (var i = 0; i < filled_markers.length; ++i) {
                filled_markers[i].setVisible(true);
            }
        }

    });


});
