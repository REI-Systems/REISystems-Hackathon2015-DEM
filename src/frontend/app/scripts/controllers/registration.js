'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('RegistrationCtrl', ['$scope','firebaseFactory','ApiInterfaceService','$q',function ($scope,firebaseFactory,ApiInterfaceService,$q) {
    $scope.generalMessage = "";
    $scope.form = {};
    $scope.processing = false;
    $scope.stateOptions = [];
    var states = ApiInterfaceService.call('usGeoloc','',{});
    states.then(function(data){
    	$scope.stateOptions = data;
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
		'Child Care Services',
		'Transportation Services',
		'Translation Services', 
		'Clerical Services', 
		'Burial Services',
		'Debris Removal', 
		'Protective Measures', 
		'Roads & Bridges', 
		'Water Control Facilities', 
		'Public Buildings', 
		'Public Utilities', 
		'Recreational or Other', 
		'State Management', 
    ];
    $scope.disasterInterestOptions = [
		'Chemical','Coastal Storm','Dam/Levee Break','Drought',
		'Earthquake','Fire','Fishing Losses','Flood','Freezing',
		'Human Cause','Hurricane','Mud/Landslide','Other','Severe Ice Storm',
		'Severe Storm(s)','Snow','Terrorist','Tornado','Toxic Substances',
		'Tsunami','Typhoon','Volcano' 
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
		var deferred = $q.defer();
		var googleMaps = ApiInterfaceService.call('googleMaps','',{address:$scope.form.address+", "+$scope.form.state,components:'country:US'});
		googleMaps.then(function(data){
	    	//console.log(data.results);
	    	data.results.forEach(function(el,idx,arr){
	    		if(typeof el.partial_match == "undefined"){
	    			deferred.resolve(true);
	    		}
	    	});
	    	deferred.resolve(false);
    	},function(reason){
    		$scope.generalMessage = 'Error: couldn\'t validate address';
    		//console.log(reason);
	    	deferred.reject('Error: couldn\'t validate address');
	    },function(update){
    		$scope.generalMessage = 'Error: couldn\'t validate address';
	    	//console.log(update);
	    	deferred.reject('Error: couldn\'t validate address');
	    });
	    return deferred.promise;
	}
	$scope.resetAddressValidation = function(){
		$scope.registrationForm.formAddress.$setValidity('address', true);
	}
  }]);
