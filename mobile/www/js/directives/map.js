angular.module('app.directives.map', [])
  .directive('spotsMap', function(Config, Geolocation, $http) {
    var markers = [];

    var infowindow = new google.maps.InfoWindow();
    /**
     * Add a new report to the map
     */
    var addReportToMap = function(report,map){

      map.addMarker({
        'position': new plugin.google.maps.LatLng(report.latitude,report.longitude),
        'title': report.description,
        'icon':'www/img/marker.png'
      }, function(marker) {
        markers.push(marker);
      });
    };
    return {
      restrict: 'E',
      scope: {
      },
      link: function ($scope, $element, $attr) {
        function initialize() {

          var map = plugin.google.maps.Map.getMap($element[0],{
            'camera':{
              'latLng': new plugin.google.maps.LatLng(37.7836830,-122.4092210),
              'zoom': 12
            }
          });

          var positionPromise = Geolocation.getCurrentPosition();
          //var map = new google.maps.Map($element[0], mapOptions);
          map.on(plugin.google.maps.event.MAP_READY, function(){
            positionPromise.then(function(result){
              var position = new plugin.google.maps.LatLng(result.coords.latitude,result.coords.longitude);
              map.setCenter(position);
              map.setZoom(14);

              map.addMarker({
                'position': position,
                'icon':'www/img/dot.png'
              }, function(marker) {
                markers.push(marker);
              });
            });
            $http.get(Config.url+'/api/cases').then(function(resp){
              data = resp.data;

              for(var i = 0; i < data.length; i++){
                var report = data[i];
                addReportToMap(report,map);
              }
            });
          });
        }
        document.addEventListener("deviceready", initialize);
      }
    }
  });

