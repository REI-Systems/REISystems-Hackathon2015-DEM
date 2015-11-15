'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
var app = angular
  .module('frontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'firebase',
    'angularSpinner',
    'angular-carousel'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'registration'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


  angular.module('frontendApp')
    .controller('NavCtrl', function ($scope, $timeout, $mdSidenav, $mdDialog) {
      $scope.toggleLeft = buildDelayedToggler('left');
      /**
       * Navigate to url
       */
      $scope.navigateTo = function(to, event){
        $mdDialog.show(
          $mdDialog.alert()
          .title('Navigating')
          .content('Imagine being taken to ' + to)
          .ariaLabel('Navigation demo')
          .ok('Ok')
          .targetEvent(event)
        );
      };
      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
              args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }
      /**
       * Build handler to open/close a SideNav
       */
      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID).toggle();
        }, 200);
      }

    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav) {
      $scope.close = function () {
        $mdSidenav('left').close();
      };
    });
