'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:firebaseFactory
 * @description
 * # firebaseFactory
 * Controller of the frontendApp
 */
app.factory('firebaseFactory', ['$firebaseObject','$window','$location','$q',function ($firebaseObject,$window,$location,$q){
    var _url = 'https://popping-fire-2842.firebaseio.com/registrations';
    var _ref = new Firebase(_url);
    
    return {
        addItem: function(item){
        	var dt = new Date();
			var utcDate = dt.toUTCString();
        	item.date = utcDate;
        	var deferred = $q.defer();
        	_ref.push(item,function(e){
		    	if(e === null){
		    		deferred.resolve(true);
		    	}
		    	else{
		    		deferred.reject(false);
		    		alert("Error adding to Firebase");
		    		console.log(e);
		    	}
		    });
	    	return deferred.promise;
        },
        getData: function(){
			return $firebaseObject(_ref);
        }
    };
}]);
