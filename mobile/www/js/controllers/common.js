angular.module('app.controllers.common', [])
  .controller('MapCtrl', function($scope, $ionicModal, Config, Geolocation) {
    $scope.locations = [];
    $scope.Config = Config;
    $scope.date = 10;
    // $ionicModal.fromTemplateUrl('datepicker-modal.html', function(modal) {
    //     $scope.dateModal = modal;
    //   }, {
    //     scope: $scope,
    //     animation: 'slide-in-up'
    //   });
    $scope.options = {
      format: 'yyyy/mm/dd', // ISO formatted date
      onClose: function(e) { 
        $scope.date = this.$node[0].value;
      }
    };

    $scope.triggerDatepicker = function(){
      angular.element('input').trigger('click');
    }
  })
  .controller('MyRiskCtrl', function($scope, $location, RiskIndexService, LocalStorageService) {
    $scope.data = {};
    $scope.getMyRiskIndex = function() {

      var userId = LocalStorageService.getItem('user_id');
      if (!userId) {
        // redirect to /login page if userId is not present
        $location.path('/signin');
      }

      RiskIndexService.getRiskIndex(userId)
        .then(function(resp) {
          var indexValue = (resp && resp.value) || 0;
          $scope.data["riskIndex"] = Math.round(indexValue * 100) / 100;
          // Note: Hardcode index threshold values for now
          if (indexValue >= 0.75) {
            $scope.data["myRiskValue"] = "High"
          } else if (indexValue >= 0.5 && indexValue < .75){
            $scope.data["myRiskValue"] = "Elevated"
          } else if (indexValue >= 0.3 && indexValue < 0.5) {
            $scope.data["myRiskValue"] = "Medium"
          } else  {
            $scope.data["myRiskValue"] = "Low"
          }
        })
        .catch(function (error) {
          throw error;
        });
    };

    $scope.getMyRiskIndex();
  })
  .controller('StorageCtrl', ['$scope', 'LocalStorageService', function($scope, LocalStorageService) {
    $scope.toggleTrack = LocalStorageService.get('tracking');

    $scope.pushTrack = function() {
      if (LocalStorageService.get('tracking') === 'false') {
        LocalStorageService.setItem('tracking', 'true');
      }
      else {
        LocalStorageService.setItem('tracking', 'false');
      }
    };
  }]);
