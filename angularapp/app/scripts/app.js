'use strict';

/**
 * @ngdoc overview
 * @name frontendissuetimerApp
 * @description
 * # frontendissuetimerApp
 *
 * Main module of the application.
 */
angular
  .module('frontendissuetimerApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth'
  ])
  .config(function ($routeProvider, $authProvider, $httpProvider) {
    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend
    
    // if-modified-since

    $authProvider.configure({
      apiUrl:                  'http://localhost:1337',
      tokenValidationPath:     '/auth/validate_token',
      signOutUrl:              '/logout',
      emailRegistrationPath:   '/user',
      accountUpdatePath:       '/auth',
      accountDeletePath:       '/auth',
      confirmationSuccessUrl:  window.location.href,
      passwordResetPath:       '/auth/password',
      passwordUpdatePath:      '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath:         '/login',
      storage:                 'cookies',
      proxyIf:                 function() { return false; },
      proxyUrl:                '/proxy',
      authProviderPaths: {
        github:   '/auth/github',
        facebook: '/auth/facebook',
        google:   '/auth/google'
      },
      tokenFormat: {
        'access-token': '{{ token }}',
        'token-type':   'Bearer'
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers.expiry) * 1000) || null;
        // return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
