'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('RegistrationCtrl', ['$rootScope','$scope','firebaseFactory','ApiInterfaceService','$q','$log','$location','$mdToast',function ($rootScope,$scope,firebaseFactory,ApiInterfaceService,$q,$log,$location,$mdToast) {
    //get state data from api
    $scope.loadStateOptions = function(){
    	var states = ApiInterfaceService.call('usGeoloc','',{});
	    states.then(function(data){
	    	$scope.stateOptions = data;
	    },function(reason){
	    	$log.error(reason);
	    });
    };
    //get past disaster data from api
    $scope.loadPastDisasterOptions = function(){
    	var femaDisaster = ApiInterfaceService.call('femaDisaster','',{'$select':'disasterNumber,title,incidentBeginDate','$orderby':'incidentBeginDate desc'});
	    var savedDisasterNumbers = [];
	    femaDisaster.then(function(data) {
	    	var reformattedArray = data.DisasterDeclarationsSummaries.filter(function(obj){ 
				if(savedDisasterNumbers.indexOf(obj.disasterNumber)!==-1){
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
			$scope.disasterParticipationOptions = reformattedArray;
		}, function(reason) {
			$log.error(reason);
		});
    }
    //submission processing
    $scope.submit = function() {
    	//angularjs added some extra properties to our form, angular.toJson strips it, and we set it back up as an object
    	var form = JSON.parse(angular.toJson($scope.form));
    	var phone = form.phone;
    	phone = phone.replace(/\D/g,'');
    	phone = phone.substring(0,3)+"-"+phone.substring(3,6)+"-"+phone.substring(6,10);
    	form.phone = phone;
    	var promise = firebaseFactory.addItem(form);
    	promise.then(function(resolve){
    		$location.path('/');
    		$scope.showSuccessToast();
		}, function(reject){
    		$log.error(reject);
    		$scope.generalMessage = "Error making submission, please try again later";
    	});
	};
	//required code for toast notification
	$scope.showSuccessToast = function() {
		$mdToast.show(
			$mdToast.simple()
				.content('Submission Successful!')
				.position($scope.getToastPosition())
				.hideDelay(3000)
		);
	};
	var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };
	$scope.toastPosition = angular.extend({},last);
	$scope.getToastPosition = function() {
		sanitizePosition();
		return Object.keys($scope.toastPosition)
			.filter(function(pos) { return $scope.toastPosition[pos]; })
			.join(' ');
	};
	function sanitizePosition() {
		var current = $scope.toastPosition;
		if ( current.bottom && last.top ) current.top = false;
		if ( current.top && last.bottom ) current.bottom = false;
		if ( current.right && last.left ) current.left = false;
		if ( current.left && last.right ) current.right = false;
		last = angular.extend({},current);
	}
	//address validation, done on submit
	$scope.validateAddress = function(){
		var deferred = $q.defer();
		var googleMaps = ApiInterfaceService.call('googleMaps','',{address:$scope.form.address+", "+$scope.form.state,components:'country:US'});
		googleMaps.then(function(data){
	    	data.results.forEach(function(el){
	    		if(typeof el.partial_match === "undefined"){
	    			deferred.resolve(true);
	    		}
	    	});
	    	deferred.resolve(false);
    	},function(){
    		$scope.generalMessage = 'Error: couldn\'t validate address';
    		deferred.reject('Error: couldn\'t validate address');
	    },function(){
    		$scope.generalMessage = 'Error: couldn\'t validate address';
	    	deferred.reject('Error: couldn\'t validate address');
	    });
	    return deferred.promise;
	};
	$scope.resetAddressValidation = function(){
		$scope.registrationForm.formAddress.$setValidity('address', true);
	};
    $scope.generalMessage = "";
    $scope.form = {};
    $scope.stateOptions = [];
    $scope.disasterParticipationOptions = [];
    $scope.loadStateOptions();
    $scope.loadPastDisasterOptions();
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
		'State Management'
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
    	{ name: 'over 250 miles', value: '>250' }
    ];
    $scope.compensationTypeOptions = [
    	'Volunteer',
		'Compensation'
    ];

  }]);
