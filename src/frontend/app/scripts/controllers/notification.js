'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
app.controller('NotificationCtrl', ['$rootScope','$scope',function ($rootScope,$scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.notifactionMsg = "";
    $rootScope.$on('notification', function(event, args) {
    	//console.log("made it");
    	//console.log(event,args);
    	$scope.notifactionMsg = args.msg;
    });
  }]);
