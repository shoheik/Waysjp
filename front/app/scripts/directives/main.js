'use strict';

angular.module('frontApp')
.directive('drawing', function($compile){
    return {
        restrict: 'A',
        link: function(scope, element){
            console.log('loading..');
            var mapOptions = {
              center: new google.maps.LatLng(-34.397, 150.644),
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            console.log(mapOptions);
            console.log(element);
            var canvas = element[0]; 
            canvas.id = "test";
            canvas.width  = 800;
            canvas.height = 600;
            //var canvas = document.getElementById("map_canvas");
            var map = new google.maps.Map(canvas, mapOptions);
            //google.maps.event.trigger(map, 'resize') 
            console.log(map);
            var controlTemplate = document.getElementById('test').innerHTML.trim();
            var controlElem = $compile(controlTemplate)(scope);
             map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlElem[0]);
        }
    };
})

.directive('sayHello', function ($compile) {
      return function (scope, elem, attrs) {
        var mapOptions,
          latitude = attrs.latitude,
          longitude = attrs.longitude,
          controlTemplate,
          controlElem,
          map;

        latitude = latitude && parseFloat(latitude, 10) || 43.074688;
        longitude = longitude && parseFloat(longitude, 10) || -89.384294;

        mapOptions = {
          zoom: 8,
          disableDefaultUI: true,
          center: new google.maps.LatLng(latitude, longitude)
        };
        map = new google.maps.Map(elem[0], mapOptions);
        var controlTemplate = document.getElementById('helloControl').innerHTML.trim();
        var controlElem = $compile(controlTemplate)(scope);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlElem[0]);
      };
});    

