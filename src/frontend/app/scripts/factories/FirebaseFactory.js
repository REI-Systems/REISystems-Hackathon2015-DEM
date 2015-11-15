'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:firebaseFactory
 * @description
 * # firebaseFactory
 * Controller of the frontendApp
 */
app.factory('firebaseFactory', ['$firebaseObject','$window',function ($firebaseObject,$window){
    var _url = 'https://popping-fire-2842.firebaseio.com/registrations';
    var _ref = new Firebase(_url);
    
    return {
        addItem: function(item){
        	var dt = new Date();
			var utcDate = dt.toUTCString();
        	item.date = utcDate;
        	_ref.push(item,function(e){
		    	if(e === null){
		    		alert("Added to Firebase successfully");
		    		$window.location.href= '/';
		    	}
		    	else{
		    		alert("Error adding to Firebase");
		    		console.log(e);
		    	}
		    });
        },
        getData: function(){
			return $firebaseObject(_ref);
        }
    };
}]);
