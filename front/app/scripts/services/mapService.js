'use strict';

angular.module('frontApp')
.factory('googleMap', function ($http, $rootScope) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var geocoder = new google.maps.Geocoder();
    var source = "";
    var destination = "";
    return {
        init: function(){
            geocoder.geocode( { 'address': this.source}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var mapOptions = {
                        center: results[0].geometry.location,
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
                    directionsDisplay.setMap(map); 
                    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
                    console.log(map);
                }else{
                    //alert("Geocode was not successful for the following reason: " + status);
                }
            });

        },
        getSource: function(){
            return this.source;
        },
        getDestination: function(){
            return this.destination;
        },
        setSource: function(source){
            this.source = source;
        },
        setDestination: function(destination){
            this.destination = destination;
        },
        getRoute: function(){
            console.log(this.source);
            console.log(this.destination);
            var request = {
                origin: this.source,
                destination: this.destination,
                //travelMode: google.maps.TravelMode.DRIVING
                //travelMode: google.maps.TravelMode['TRANSIT']
                travelMode: google.maps.TravelMode.WALKING
            };

            directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                    console.log(result);
                }
            });
        }
    }
});
