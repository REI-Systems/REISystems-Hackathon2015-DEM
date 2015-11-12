
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
		var myDataRef = new Firebase('https://popping-fire-2842.firebaseio.com/registrations');
		//console.log($scope.form);
	    myDataRef.push($scope.form,function(e){
	    	if(e === null){
	    		alert("Added to Firebase successfully");
	    	}
	    	else{
	    		alert("Error adding to Firebase");
	    		console.log(e);
	    	}
	    });	    
	};
  }]);
