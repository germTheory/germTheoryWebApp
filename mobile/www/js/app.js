angular.module('app', [
  'ionic',
  'ngCordova',
  'app.controllers.common',
  'app.controllers.settings',
  'app.controllers.auth',
  'app.services.common',
  'app.services.geo-location',
  'app.services.settings',
  'app.services.auth',
  'app.directives.map'])

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tab.map', {
        url: '/map',
        views: {
          'tab-map': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('tab.myrisk', {
        url: '/myrisk',
        views: {
          'tab-myrisk': {
            templateUrl: 'templates/myrisk.html',
            controller: 'MyRiskCtrl'
          }
        }
      })
      .state('tab.report', {
        url: '/report',
        views: {
          'tab-report': {
            templateUrl: 'templates/report.html',
            controller: 'ReportCtrl'
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'AuthCtrl'
      });

    $urlRouterProvider.otherwise('/tab/map');

    // Add our $httpInterceptor into the array of interceptors here
    $httpProvider.interceptors.push('AttachTokens');
  })

  .run(function ($ionicPlatform, $rootScope, $location, AuthService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !AuthService.isAuth()) {
        $location.path('/login');
      }
    });
  });
