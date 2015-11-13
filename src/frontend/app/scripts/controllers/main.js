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

    var apiCalls = [
        {
            "name": "noaa",
            "oParams": {
                "x":1
            }
        },
        {
            "name": "femaDisaster",
            "oParams": {
                "$filter": "declarationDate gt '2015-07-01T04:00:00.000z'",
                "$top": "1000",
                "$format": "json"
            }
        },
        {
            "name": "usGeoloc",
            "oParams": {}
        }
    ];

    ApiInterfaceService.calls(apiCalls).then(
    function(resultls){
        console.log(resultls);
//        var x2js = new X2JS();
//        var jsonData = x2js.xml_str2json( xmlData );
//        console.log(xmlData);
//        console.log(jsonData);

        var map = new Datamap({
            element: document.getElementById('container'),
            scope: 'usa',
            geographyConfig: {
                highlightBorderColor: '#bada55',
                popupTemplate: function(geography, data) {
                    console.log(geography);
                  return '<div class="hoverinfo">' + geography.properties.name +'</div>'
                },
    //            highlightBorderWidth: 3
            },
            fills: {
                'HIGH': '#CC4731',
                'MEDIUM': '#306596',
                'LOW': '#667FAF',
                'defaultFill': '#DDDDDD'
            },
            data: {
                "AZ": {
                  "fillKey": "MEDIUM",
                },
                "CO": {
                  "fillKey": "HIGH",
                },
                "DE": {
                  "fillKey": "LOW",
                },
                "GA": {
                  "fillKey": "MEDIUM",
                }
            }
        });

        var bombs = [{
            name: 'Joe 4',
            radius: 4,
            yield: 400,
            country: 'USSR',
            fillKey: 'RUS',
            significance: 'First fusion weapon test by the USSR (not "staged")',
            date: '1953-08-12',
            latitude: 37.7680,
            longitude: -78.2057
          }
        ];
        //draw bubbles for bombs
        map.bubbles(bombs, {
            popupTemplate: function (geo, data) { 
                return ['<div class="hoverinfo">' +  data.name,
                '<br/>Payload: ' +  data.yield + ' kilotons',
                '<br/>Country: ' +  data.country + '',
                '<br/>Date: ' +  data.date + '',
                '</div>'].join('');
            }
        });

        //draw a legend for this map
        map.labels();
        map.legend();
    },
    function(error) {
        console.log(error);
    });


    $scope.test = 'Hey !!';
}]);
