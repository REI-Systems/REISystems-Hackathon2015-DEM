'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('RegistrationCtrl', ['$scope','firebaseFactory','ApiInterfaceService',function ($scope,firebaseFactory,ApiInterfaceService) {
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
    /*$scope.test = ApiInterfaceService.call('femaDisaster','',{'$select':'title,incidentBeginDate','$orderby':'incidentBeginDate desc'});
    $scope.test.then(function(greeting) {
    	console.log(greeting);
	}, function(reason) {
		console.log(reason);
	}, function(update) {
		console.log(update);
	});*/
    $scope.assistanceInterestOptions = [
    	'Produce',
		'Shelter',
		'Medical Services',
		'Legal Services',
		'Moving Services',
		'Carpenter Services',
		'Waste Management Services',
		'IT Services',
		'Counseling Services',
		'Chill Care Services',
		'Transportation Services',
		'Translation Services', 
		'Clerical Services', 
		'Burial Services'
    ];
    $scope.disasterInterestOptions = [
		{name:'Major Disaster Declaration', value:'DR'}, 
		{name:'Fire Management Assistance Declaration', value:'FM'}, 
		{name:'Fire Suppression Authorization', value:'FS'},  
		{name:'Emergency Declaration', value:'EM'}, 
    ];
    $scope.serviceInterestOptions = [
    	{ name: '5 miles', value: '5' },
    	{ name: '10 miles', value: '10' },
    	{ name: '25 miles', value: '25' },
    	{ name: '50 miles', value: '50' },
    	{ name: '100 miles', value: '100' },
    	{ name: '250 miles', value: '250' },
    	{ name: 'over 250 miles', value: '>250' },
    ];
    $scope.compensationTypeOptions = [
    	'Volunteer',
		'Compensation'
    ];
    $scope.submit = function() {
    	$scope.processing = true;
		firebaseFactory.addItem($scope.form); 
	};
  }]);
