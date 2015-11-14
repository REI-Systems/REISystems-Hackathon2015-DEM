'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:firebaseFactory
 * @description
 * # firebaseFactory
 * Controller of the frontendApp
 */
app.factory('firebaseFactory', function myService(){
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
		    	}
		    	else{
		    		alert("Error adding to Firebase");
		    		console.log(e);
		    	}
		    });
        }
    };
});
