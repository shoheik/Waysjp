'use strict';

angular.module('frontApp')
.controller('MainCtrl', function ($scope, $location, googleMap) {

  $scope.source = "Tokyo Station";
  $scope.destination = "Shibuya";

  $scope.showMap = function(){
      googleMap.setSource($scope.source);
      googleMap.setDestination($scope.destination);
      $location.path('/map')
  };
  
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
  
});
