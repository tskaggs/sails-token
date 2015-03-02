'use strict';

/**
 * @ngdoc function
 * @name frontendissuetimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendissuetimerApp
 */
angular.module('frontendissuetimerApp')
  .controller('MainCtrl', function ($scope, $auth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.handleBtnClick = function() {

      	$auth.submitLogin($scope.loginForm)
        .then(function(resp) { 
          // handle success
        })
        .catch(function(resp) { 
          // handle errors
        });
    };
	$scope.handleRegBtnClick = function() {
		console.log('registrationForm', $scope.registrationForm);
		// var derpp = $scope.registrationForm;
		// // var herpp = angular.element(derpp).serialize();
		// var herpp = derpp.serializeArray();

    	$auth.submitRegistration($scope.registrationForm)
        .then(function(resp) { 
          // handle success response
          console.log('resp then ', resp);
        })
        .catch(function(resp) { 
          // handle error response
          console.log('resp error ', resp);
        });
    };

    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) { 
          // handle success response
        })
        .catch(function(resp) { 
          // handle error response
        });
    };
  });
