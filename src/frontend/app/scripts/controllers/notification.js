'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the frontendApp
 */
app.controller('NotificationCtrl', ['$rootScope','$scope',function ($rootScope,$scope) {
    $scope.notifactionMsg = "";
    $rootScope.$on('notification', function(event, args) {
    	$scope.notifactionMsg = args.msg;
    });
  }]);
