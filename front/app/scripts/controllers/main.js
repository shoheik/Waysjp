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
  
})
.controller('MapCtrl', function ($scope, googleMap) {
    console.log("loading control");
    //var source = googleMap.getSource();
    //var destination = googleMap.getDestination();
    var destination = "Tsukiji Market";
    var source = "Shibuya station";
    $scope.transitURL = "https://www.google.co.jp/maps?ie=UTF8&f=d&dirflg=r&saddr=" + source +  "&daddr=" + destination + "&date=114/1/19&ttype=dep&sort=time";

    googleMap.setSource("Tsukiji station");
    googleMap.setDestination("Tsukiji honganji");
    googleMap.init();
    googleMap.getRoute();

   $scope.addMarker = function(){
       googleMap.addMarker($scope.inputText);
   };
  
});
