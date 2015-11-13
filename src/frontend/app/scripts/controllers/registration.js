'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('RegistrationCtrl', ['$scope','firebaseFactory',function ($scope,firebaseFactory) {
    $scope.form = {};
    $scope.processing = false;
    $scope.stateOptions = [
		{
	    	name: 'Virginia',
	    	value: 'VA'
    	}
    ];
    $scope.disasterParticipationOptions = [
    	{ name: 'test', value: 'test' }
    ];
    $scope.assistanceInterestOptions = [
    	{ name: 'test', value: 'test' }
    ];
    $scope.disasterInterestOptions = [
    	{ name: 'test', value: 'test' }
    ];
    $scope.serviceInterestOptions = [
    	{ name: 'test', value: 'test' }
    ];
    $scope.compensationTypeOptions = [
    	{ name: 'test', value: 'test' }
    ];
    $scope.submit = function() {
    	$scope.processing = true;
		firebaseFactory.addItem($scope.form); 
	};
  }]);
