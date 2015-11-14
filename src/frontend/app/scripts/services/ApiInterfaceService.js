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
        "noaa": "https://cx0kmi7urj.execute-api.us-east-1.amazonaws.com/prod/forecasts",
        "usGeoloc": "/data/us-geoloc.json",
        "femaDisaster": "http://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries",
        "googleNews": "https://tar5pekho5.execute-api.us-east-1.amazonaws.com/prod/ga-fema-news-by-state",
        "femaNews": "https://dm258ridhh.execute-api.us-east-1.amazonaws.com/prod/get-news"
    };

    this.APIs = APIs;

    /**
     * common function to perform an API CALL
     * 
     * @param String ApiName
     * @param String ApiSuffix
     * @param Object JSON oParams
     * @returns {$q@call;defer.promise}
     */
    this.call = function(ApiName, ApiSuffix, oParams) {
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

    /**
     * common function to perform multiple API CALLS
     * 
     * @param Array object aApiParams
     * @returns {$q@call;defer.promise}
     */
    this.calls = function(aApiParams) {
        var deferred = $q.defer();
        var urlCalls = [];

        angular.forEach(aApiParams, function(oApiParam){
            urlCalls.push($http.get(APIs[oApiParam.name], {params:oApiParam.oParams}));
        });

        $q.all(urlCalls)
        .then(
            function(results) {
                deferred.resolve(results);
            },
            function(errors) {
                deferred.reject(errors);
            },
            function(updates) {
                deferred.update(updates);
            }
        );

        return deferred.promise;
    };
}]);
