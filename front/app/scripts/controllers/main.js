'use strict';

angular.module('frontApp')
.controller('MainCtrl', function ($scope, $location, googleMap, $q, $rootScope) {

  $scope.source = "Tokyo Station";
  $scope.destination = "Shibuya";

  $scope.showMap = function(){
      googleMap.setSource($scope.source);
      googleMap.setDestination($scope.destination);
      $location.path('/map')
  };


  /*
    function async_geocoder(address){
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
    
    async_geocoder('tokyo').then(function(a){ console.log(a)});
    */

  
})
.controller('MapCtrl', function ($scope, googleMap) {
    console.log("loading control");

    var source = googleMap.getSource();
    var destination = googleMap.getDestination();
    $scope.transitURL = "https://www.google.co.jp/maps?ie=UTF8&f=d&dirflg=r&saddr=" + source +  "&daddr=" + destination + "&date=114/1/19&ttype=dep&sort=time";

    /*
    function initialize() {
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        directionsDisplay.setMap(map); 
        console.log(map);
    }
    */
   googleMap.init();
   googleMap.getRoute();

   $scope.addMarker = function(){
       googleMap.addMarker($scope.inputText);
   };
  
});
