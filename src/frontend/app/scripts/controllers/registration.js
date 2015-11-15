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
    $scope.stateOptions = [];
    var states = ApiInterfaceService.call('usGeoloc','',{});
    states.then(function(data){
    	//console.log(data);
    	$scope.stateOptions = data;//console.log(data);
    },function(reason){
    	//todo
    },function(update){
    	//todo
    });
    var femaDisaster = ApiInterfaceService.call('femaDisaster','',{'$select':'disasterNumber,title,incidentBeginDate','$orderby':'incidentBeginDate desc'});
    var savedDisasterNumbers = [];
    femaDisaster.then(function(data) {
    	var reformattedArray = data.DisasterDeclarationsSummaries.filter(function(obj,idx,array){ 
			if(savedDisasterNumbers.indexOf(obj.disasterNumber)!=-1){
				return false;
			}
			else{
				/*var rObj = {};
				rObj.id = obj.id;
				rObj.title = obj.title;
				rObj.incidentBeginDate = obj.incidentBeginDate;
				var date = new Date(obj.incidentBeginDate);
				rObj.optionText = date +" - "+obj.title;
				return rObj;*/
				savedDisasterNumbers.push(obj.disasterNumber);
				return true;
			}
		});
		var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		reformattedArray = reformattedArray.map(function(obj){
			var rObj = {};
			rObj.id = obj.id;
			rObj.title = obj.title;
			rObj.disasterNumber = obj.disasterNumber;
			rObj.incidentBeginDate = obj.incidentBeginDate;
			var date = new Date(obj.incidentBeginDate);
			rObj.optionText = obj.title.trim() + ", " + obj.disasterNumber+" - "+(monthNames[date.getUTCMonth()]) + " "+ date.getUTCDate()+ ", "+ date.getUTCFullYear();
			return rObj;
		});
		//console.log(reformattedArray);
		$scope.disasterParticipationOptions = reformattedArray;
	}, function(reason) {
		//console.log(reason);
	}, function(update) {
		//console.log(update);
	});
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
	$scope.validateAddress = function(){
		//console.log('i made it here');
		var googleMaps = ApiInterfaceService.call('googleMaps','',{address:$scope.form.address,components:'country:US'});
		googleMaps.then(function(data){
	    	//console.log(data);
    	},function(reason){
    		//console.log(reason);
	    },function(update){
	    	//console.log(update);
	    });
	}
  }]);
