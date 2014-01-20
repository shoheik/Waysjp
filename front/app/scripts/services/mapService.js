'use strict';

angular.module('frontApp')
.factory('googleMap', function ($http, $rootScope, $q) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var geocoder = new google.maps.Geocoder();
    var source = "";
    var destination = "";
    var map;
    
    function deferredGeocoder(address){
        var deferred = $q.defer();
        var geo = new google.maps.Geocoder();
        geo.geocode({address: address}, function(results,status){
            if (status == google.maps.GeocoderStatus.OK){
                deferred.resolve(results[0].geometry.location);
                $rootScope.$digest();
            }else{
                deferred.reject();
                $rootScope.$digest();
            }   
        });   
        return deferred.promise;
    }  
    
   // async_geocoder('tokyo').then(function(a){ console.log(a)});
    
    return {
        init: function(){
            geocoder.geocode( { 'address': this.source}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var mapOptions = {
                        center: results[0].geometry.location,
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
                    directionsDisplay.setMap(map); 
                    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
                    console.log(map);

                    deferredGeocoder('原宿').then(function(loc){
                        var marker = new google.maps.Marker({
                            position: loc, 
                            map: map,
                            title: 'Hello World!'
                        });

                        google.maps.event.addListener(marker, 'click', function() {
                            alert('show video maybe?');
                        });
                    });

                }else{
                    //alert("Geocode was not successful for the following reason: " + status);
                }
            });

        },
        getSource: function(){
            return this.source;
        },
        addMarker: function(locStr){
           deferredGeocoder(locStr).then(function(loc){
               console.log(loc);
               var marker = new google.maps.Marker({
                   position: loc, 
                   map: map,
                   title: locStr 
               });
           });

            //var marker = new google.maps.Marker({
            //    position: new google.maps.LatLng(35.691638, 39.704616),
            //    map: map,
            //    title: 'Hello World!'
            //});
            //console.log('marker');
            //console.log(marker);
        },
        getMap: function(){
            return this.map;
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
