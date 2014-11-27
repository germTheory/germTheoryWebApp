angular.module('app.directives.map', [])
  .directive('spotsMap', function(Config, LocalStorageService, $http) {
    var markers = [];
    /**
     * Add a new report to the map
     */
    var addReportToMap = function(report, map, type, popupMsg){
      var date = new Date();
      var date2 = new Date(report.date)
      console.log(report.date);
      var dateDiff = date.getTime() - date2.getTime();
      console.log(dateDiff);
      if(type === "infected"){
        var marker = L.circle([report.latitude, report.longitude], (1/(dateDiff*.75)) * 100000000000, {
          color: '#f03',
          fillColor: '#f03',
          fillOpacity: 0.6,
          opacity: 0.01
        }).addTo(map);
        L.circle([report.latitude, report.longitude], (1/(dateDiff*.75)) * 100000000000, {
          color: '#f03',
          fillColor: '#f03',
          fillOpacity: 0.6,
          opacity: 0.01
        }).addTo(map);
        if (popupMsg){
          marker.bindPopup(popupMsg);
        }
        markers.push(marker);
      } else if(type === "user"){
        var marker = L.circle([report.latitude, report.longitude], 30, {
          color: 'blue',
          fillColor: '#365CF1',
          fillOpacity: 0.5
        }).addTo(map);
        if (popupMsg){
          marker.bindPopup(popupMsg);
        }
        markers.push(marker);
      }
    };

    // Return various things
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
      },
      link: function (scope, element, attr) {
        function initialize() {
          // var mapOptions = {
          //   center: new google.maps.LatLng(37.7836830,-122.4092210),
          //   zoom: 16,
          //   mapTypeId: google.maps.MapTypeId.ROADMAP
          // };
          var map = L.map(element[0], {
            dragging: true,
            center: [37.741399, -122.43782],
            zoom: 12,
            touchZoom: true,
            tap: false
          });

          map.locate({ setView: true, maxZoom: 14 });
          function onLocationFound(e) {
              console.log("found location");
              
              var radius = e.accuracy / 2;

              L.marker(e.latlng).addTo(map).bindPopup('<b>You are here!</b>');

              L.circle(e.latlng, radius).addTo(map);
          }
          L.tileLayer('http://{s}.tiles.mapbox.com/v3/kmeurer.k9ccphdb/{z}/{x}/{y}.png', {
              maxZoom: 18,
              dragging: true
          }).addTo(map);

          function onLocationError(e) {
              console.log("fail silently");
          }
          map.on('locationfound', onLocationFound);
          map.on('locationerror', onLocationError);
          // var map = new google.maps.Map(element[0], mapOptions);

          // get all cases
          $http({
            method: 'GET',
            url: Config.url+'/api/cases'
          }).then(function(resp){
            var data = resp.data;
            var diseasePoints = [];
            for( var i = 0; i < data.length; i++ ){
              diseasePoints.push([data[i].latitude, data[i].longitude]);
            }
            var heat = L.heatLayer(diseasePoints, {
              radius: 30,
              max: .25,
              blur: 15,
              maxZoom: 17
            }).addTo(map);
            // for(var i = 0; i < data.length; i++){
            //   var report = data[i];
            //   momentDate = new moment(report.date).format('MMMM Do, YYYY');
            //   diseaseName = report.disease.name;
            //   addReportToMap(report, map, "infected", "<b>" + diseaseName + ' Report</b><br>Date: ' + momentDate + '<br>' + report.description);
            // }
          });

          // get all locations for signed in user
          $http({
            method: 'GET',
            url:  Config.url + '/api/locations'
          }).then(function(resp){
            data = resp.data;
            for(var i = 0; i < data.length; i++){
              var report = data[i];
              addReportToMap(report, map, "user");
            }
          });

          // zoom to a marker when clicked
          map.on('popupopen', function(centerMarker) {
                  map.panTo(centerMarker.popup._latlng);
              });
        }

        if (document.readyState === "complete") {
          initialize();
        } else {
          // google.maps.event.addDomListener(window, 'load', initialize);
        }
      }
    }
  });

