angular.module('app.services.auth', [])
  .factory('AuthService', function AuthService($http, $location, AuthTokenService, LocalStorageService) {

    var signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
        .then(function (resp) {
          AuthTokenService.setToken(resp.data.token);
          LocalStorageService.setItem('id', resp.data.user.id);
          return resp;
        });
    };

    var shouldAuthenticate = function(state) {
      if (state === 'signin' || state === 'signup' || state === 'get-started' || state === 'user-info') {
        return false;
      }
      return true;
    }

    var signup = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
        .then(function(resp) {
          AuthTokenService.setToken(resp.data.token);
          LocalStorageService.setItem('id', resp.data.user.id);
          return resp;
        });
    };

    var isAuthenticated = function () {
      return !!AuthTokenService.getToken();
    };

    var signout = function () {
      AuthTokenService.setToken();
      LocalStorageService.removeItem('id');
      $location.path('/signin');
    };

    return {
      signin: signin,
      signup: signup,
      isAuthenticated: isAuthenticated,
      signout: signout,
      shouldAuthenticate: shouldAuthenticate
    };
  })
  .factory('AuthTokenService', function AuthTokenFactory($window) {
    var store = $window.localStorage;
    var key = 'auth-token';

    var getToken = function() {
      return store.getItem(key);
    };

    var setToken = function(token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    };

    return {
      getToken: getToken,
      setToken: setToken
    };
  })
  .factory('AuthInterceptor', function AuthInterceptor(AuthTokenService) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var addToken = {
      request: function (config) {
        var jwt = AuthTokenService.getToken();
        if (jwt) {
          config.headers = config.headers || {};
          config.headers['x-access-token'] = jwt;
        }
        config.headers['Allow-Control-Allow-Origin'] = '*';
        return config;
      }
    };

    return addToken;
  });
