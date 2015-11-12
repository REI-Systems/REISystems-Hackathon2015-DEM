'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('RegistrationCtrl', ['$scope',function ($scope) {
    $scope.form = {};
    $scope.processing = false;
    $scope.stateOptions = [
    	{
	    	name: 'State',
	    	value: null
    	},
		{
	    	name: 'Virginia',
	    	value: null
    	}
    ];
    $scope.disasterParticipationOptions = [
    	{
	    	name: 'Disasters You Participated in',
	    	value: null
    	},
    ];
    $scope.assistanceInterestOptions = [
    	{
	    	name: 'Type of Assistance you are interested in',
	    	value: null
    	},
    ];
    $scope.disasterInterestOptions = [
    	{
	    	name: 'Type of Disaster you are interested in',
	    	value: null
    	},
    ];
    $scope.serviceInterestOptions = [
    	{
	    	name: 'Radius of service you are interested in',
	    	value: null
    	},
    ];
    $scope.compensationTypeOptions = [
    	{
	    	name: 'Type of compensation',
	    	value: null
    	},
    ];
    $scope.submit = function() {
    	
    	$scope.processing = true;
		var myDataRef = new Firebase('https://popping-fire-2842.firebaseio.com/registrations');
	    myDataRef.push($scope.form);
	    
	};
  }]);
