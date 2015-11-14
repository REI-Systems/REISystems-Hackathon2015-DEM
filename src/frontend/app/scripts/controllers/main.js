'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
app.controller('MainCtrl', ['$scope', 'ApiInterfaceService', 'usSpinnerService', function ($scope, ApiInterfaceService, usSpinnerService) {
    //show spin
    usSpinnerService.spin('spinner');

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //define Noaa event type to show on map
    var aNoaaEventType = ['Earthquake Warning', 'Evacuation Immediate', 
        'Extreme Fire Danger', 'Fire Warning', 'Fire Weather Watch', 'Flood Warning', 
        'Flood Watch', 'Hurricane Warning', 'Hurricane Watch', 'Severe Thunderstorm Warning',
        'Severe Thunderstorm Watch', 'Tornado Warning', 'Tornado Watch', 'Tsunami Warning',
        'Tsunami Watch', 'Volcano Warning', 'Red Flag Warning'];

    //prepare 3 api calls (NOAA/FEMA/LOCAL)
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
                "$filter": "incidentBeginDate gt '"+moment().subtract(3, 'months').format('YYYY-MM-DD')+"T00:00:00.000Z' and incidentEndDate eq ''",
                "$top": "1000",
                "$format": "json"
            }
        },
        {
            "name": "demVolunteer",
            "oParams": {}
        },
        {
            "name": "usGeoloc",
            "oParams": {}
        }
    ];

    ApiInterfaceService.calls(apiCalls).then(
    function(resultls){
        var x2js = new X2JS();
        var noaaData = x2js.xml_str2json( resultls[0].data );
        var femaData = resultls[1].data;
        var demVolData = resultls[2].data;
        var usGeoData = resultls[3].data;

        var aMapData = {};

        //NOAA DATA (forecast)
        if(noaaData && noaaData.feed && noaaData.feed.entry) {
            angular.forEach(noaaData.feed.entry, function(row) {
                //filter NOAA forecast that we need to show on map
                if(aNoaaEventType.indexOf(row.event.__text) !== -1) {
                    //make sure we have state
                    if(row.geocode.value[1]){
                        var state = row.geocode.value[1].substr(0, 2);
                        var rowMap = {};
                        var mapData = {
                            "disasterName": row.title,
                            "disasterType": row.event.__text,
                            "date": {
                                "start": moment.utc(row.effective.__text, 'YYYY-MM-DD H:m:ss', true),
                                "end": moment.utc(row.expires.__text, 'YYYY-MM-DD H:m:ss', true)
                            }
                        };

                        //Verify if we already have state in aMapData
                        if(aMapData.hasOwnProperty(state)) { //exist
                            //push data into existing state
                            aMapData[state].data.push(mapData);
                        } else { //create state with data
                            rowMap = {
                            "fillKey": "Forecast",
                            "data": [ mapData ]
                            };

                            //push this entry to global data container 
                            aMapData[state] = rowMap;
                        }
                    }
                }
            });
        }

        //FEMA DATA (current disaster)
        if(femaData && femaData.DisasterDeclarationsSummaries) {
            angular.forEach(femaData.DisasterDeclarationsSummaries, function(row) {
                var state = row.state;
                var rowMap = {};
                var mapData = {
                    "disasterName": row.title,
                    "disasterType": row.incidentType,
                    "date": {
                        "start": moment.utc(row.declarationDate, 'YYYY-MM-DD H:m:ss', true),
                        "end": null
                    }
                };

                //Verify if we already have state in aMapData
                if(aMapData.hasOwnProperty(state)) { //exist
                    //change color state to (Forecast/Current)
                    if(aMapData[state].fillKey && aMapData[state].fillKey === "Forecast") {
                        aMapData[state].fillKey = "Current/Forecast";
                    }

                    //push data into existing state
                    aMapData[state].data.push(mapData);
                } else { //create state with data
                    rowMap = {
                    "fillKey": "Current",
                    "data": [ mapData ]
                    };

                    //push this entry to global data container 
                    aMapData[state] = rowMap;
                }
            });
        }

        var map = new Datamap({
            "element": document.getElementById('container'),
            "scope": 'usa',
            "geographyConfig": {
                "highlightBorderColor": '#bada55',
                "popupTemplate": function(geography, data) {
                    console.log(geography);
                    console.log(data);
                    var html = '<div class="hoverinfo">';
                        html += '<h4>'+geography.properties.name+'</h4>';
                        if(data) {
                            html +='<hr/>';
                            angular.forEach(data.data, function(row){
                                html +='<p><b>Disaster Name</b>: '+ row.disasterName +'<br />';
                                html +='<b>Disaster Type</b>: '+ row.disasterType +'<br />';
                                html +='<b>Disaster Date</b>: '+ row.date.start +'';
                                if(typeof row.date.end !== 'undefined' && row.date.end !== null) {
                                    html +='<br /><b>Disaster Date End</b>: '+ row.date.end;
                                }
                                html +='</p>';
                            });
                        }

                        html += '</div>'
                    return html;
                },
                //highlightBorderWidth: 3
            },
            "fills": {
                "Forecast": '#ccccff',
                "Current": '#ff9999',
                "Current/Forecast": '#ff5c33',
                "Volunteer": '#ffcc99',
                "defaultFill": '#DDDDDD'
            },
            "data": aMapData,
        });

        //Volunteers data
        var aVolunteersTmp = {};
        angular.forEach(demVolData, function(row){
            angular.forEach(usGeoData, function(oGeoLoc){
               if(row.state === oGeoLoc.name) {
                   var dataTmp = row;

                   if(aVolunteersTmp.hasOwnProperty(row.state)) { //exist
                        aVolunteersTmp[row.state].data.push(dataTmp);
                    } else { //new entry
                        aVolunteersTmp[row.state] = {
                            data: [dataTmp],
                            state: row.state,
                            radius: 8,
                            fillKey: 'Volunteer',
                            latitude: oGeoLoc.latitude,
                            longitude: oGeoLoc.longitude
                        };
                    }
                } 
            });
        });

        //draw bubbles for Volunteers
        map.bubbles(Object.keys(aVolunteersTmp).map(function(_) { return aVolunteersTmp[_]; }), {
            popupTemplate: function (geo, data) { 
                var html = '<div class="hoverinfo"><h4>Volunteer</h4>';

                angular.forEach(data.data, function(row){
                    html += '<p><b>Name</b>: '+row.businessName+ '<br />';
                    html += '<b>Address</b>: '+row.address+ ',' + row.state + ' ' + row.zip +'<br />';
                    html += '<b>Contact</b>: '+row.email+ ' / ' + row.phone +'<br />';
                    html += '<b>Service</b>: '+row.assistanceInterest+ '</p>';
                });

                html += '</div>';

                return html;
            }
        });

        $scope.aState = usGeoData;
        $scope.aDisasters = aMapData;
        $scope.aVolunteers = aVolunteersTmp;

        //draw a legend for this map
        map.labels();
        map.legend();

        usSpinnerService.stop('spinner');
    },
    function(error) {
        console.log(error);
    });

    //function to load list disasters/volunteer by state
    $scope.loadListByState = function(state) {
        console.log(state);
        $scope.aStateDisasters = [];
        $scope.aStateVolunteers = [];

        if(state !== '') {
            $scope.aStateDisasters = $scope.aDisasters[state];
            $scope.aStateVolunteers = $scope.aVolunteers[state];
        }
    };

    /// YADITI EXAMPLE
    //Google news by state
    var oGnParam = {
        "q":"fema disaster VIRGINIA",
        "rsz": 8
    };

    ApiInterfaceService.call('googleNews', '', oGnParam).then(
    function(data){ //success
        console.log("Google news sample by state")
        console.log(data);
    }, function(error) { //error
        console.log("Error");
    });

    //FEMA news REGION
    ApiInterfaceService.call('femaNews', '', {}).then(
    function(data){ //success
        console.log("Fema news sample");
        //convert data from xml to json
        var x2js = new X2JS();
        //console.log(resultls);
        var femaNewsData = x2js.xml_str2json( data );
        console.log(femaNewsData);
    }, function(error) { //error
        console.log("Error");
    });
    

    $scope.test = 'Hey !!';
}]);
