describe('Common test suite', function() {

  beforeEach(module('app'));

  describe('MyRiskCtrl', function() {
    var $scope, $rootScope, createController, RiskIndexService, AuthTokenService, $window, $httpBackend;

    beforeEach(inject(function($injector) {

      $rootScope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
      $window = $injector.get('$window');
      RiskIndexService = $injector.get('RiskIndexService');
      AuthTokenService = $injector.get('AuthTokenService');
      $scope = $rootScope.$new();

      var $controller = $injector.get('$controller');
      var fakeToken = 'fakeTokenValue';

      createController = function () {
        return $controller('MyRiskCtrl', {
          $scope: $scope,
          RiskIndexService: RiskIndexService
        });
      };

      AuthTokenService.setToken(fakeToken);
      $window.localStorage.setItem('user_id', 1);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    xit('should have a data property on the $scope', function() {
      createController();
      expect($scope.data).to.be.an('object');
    });

    xit('should have a getMyRiskIndex method on the $scope', function () {
      createController();
      expect($scope.getMyRiskIndex).to.be.a('function');
    });

    xit('should call getMyRiskIndex() when controller is loaded', function () {
      $httpBackend.whenGET("/api/proximity/users/1").respond(200, { data: { value: 0.8 }});
      createController();
      $httpBackend.flush();
      expect($scope.data.myRiskIndex).to.eql("High");
    });
  });
});
