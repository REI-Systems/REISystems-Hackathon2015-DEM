'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
app.service('ApiInterfaceService', ['$http', '$q', '$log', function ($http, $q, $log) {
    //list of APIs we're using
    var APIs = {
        "API_NAME1": "http://blabla.com",
        "API_NAME2": "http://blabla.com",
        "API_NAME3": "http://blabla.com"
    };

    /**
     * common function to perform an API CALL
     * 
     * @param String ApiName
     * @param String ApiSuffix
     * @param Object JSON oParams
     * @returns {$q@call;defer.promise}
     */
    var call = function(ApiName, ApiSuffix, oParams) {
        var deferred = $q.defer();
        $http.get(APIs[ApiName] + ApiSuffix, {params: oParams})
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });

        return deferred.promise;
    };
    
}]);
