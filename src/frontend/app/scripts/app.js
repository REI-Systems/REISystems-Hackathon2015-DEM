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
    'angular-carousel',
    'slickCarousel',
    'nvd3'
  ])
  .config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider,$locationProvider, $mdThemingProvider) {
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

        // Extend the red theme with a few different colors
        var darkBlueMap = $mdThemingProvider.extendPalette('indigo', {
          '500': '112e51',
          '600': 'e31c3d',
          'A200': 'FAD980',
          'A400': '981b1e'
        });

        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('darkBlue', darkBlueMap);

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
        .primaryPalette('darkBlue')
        .warnPalette('darkBlue',{
          'default': 'A200'
        })
        .accentPalette('darkBlue',{
          'default': 'A400'
        });
  }]);
