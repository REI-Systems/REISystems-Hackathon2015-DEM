'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', 'ApiInterfaceService', function ($scope, ApiInterfaceService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    ApiInterfaceService.call('noaa', '', {'x': 1}).then(
    function(data){
        console.log(data);
        },
    function(error) {
        console.log(error);
        }
    );
    
    $scope.test = 'Hey !!';
  }]);
