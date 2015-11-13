'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
app.controller('MainCtrl', ['$scope', 'ApiInterfaceService', function ($scope, ApiInterfaceService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    ApiInterfaceService.call('noaa', '', {'x': 1}).then(
    function(xmlData){
        var x2js = new X2JS();
        var jsonData = x2js.xml_str2json( xmlData );
        console.log(xmlData);
        console.log(jsonData);
    },
    function(error) {
        console.log(error);
    });

    $scope.test = 'Hey !!';
  }]);
