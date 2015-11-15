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

    //Populate map with data (Disaster/Forecast/Volunteers)
    ApiInterfaceService.calls(apiCalls).then(
    function(resultls){
        var x2js = new X2JS();
        var noaaData = x2js.xml_str2json( resultls[0].data );
        var femaData = resultls[1].data;
        var demVolData = resultls[2].data;
        var usGeoData = resultls[3].data;

        var aMapData = {};
        var aDataUnique = [];

        //NOAA DATA (forecast)
        if(noaaData && noaaData.feed && noaaData.feed.entry) {
            angular.forEach(noaaData.feed.entry, function(row) {
                //filter NOAA forecast that we need to show on map
                if(aNoaaEventType.indexOf(row.event.__text) !== -1) {
                    //make sure we have state
                    if(row.geocode.value[1] && aDataUnique.indexOf(row.title) === -1){
                        //add entry title to aDataUnique
                        aDataUnique.push(row.title);

                        var state = row.geocode.value[1].substr(0, 2);
                        var rowMap = {};
                        var mapData = {
                            "disasterName": row.title,
                            "disasterType": row.event.__text,
                            "date": {
                                "start": moment.utc(row.effective.__text, 'YYYY-MM-DD H:m:ss').format('LLLL'),
                                "end": moment.utc(row.expires.__text, 'YYYY-MM-DD H:m:ss').format('LLLL')
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

        //empty array of title for forecast
        aDataUnique = [];

        //FEMA DATA (current disaster)
        if(femaData && femaData.DisasterDeclarationsSummaries) {
            angular.forEach(femaData.DisasterDeclarationsSummaries, function(row) {
                if(aDataUnique.indexOf(row.title) === -1) {
                    //add entry title to aDataUnique
                    aDataUnique.push(row.title);

                    var state = row.state;
                    var rowMap = {};
                    var mapData = {
                        "disasterName": row.title,
                        "disasterType": row.incidentType,
                        "date": {
                            "start": moment.utc(row.declarationDate, 'YYYY-MM-DD H:m:ss').format('LLLL'),
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
                }
            });
        }

        var map = new Datamap({
            "element": document.getElementById('container'),
            "scope": 'usa',
            "geographyConfig": {
                "highlightBorderColor": '#bada55',
                "popupTemplate": function(geography, data) {
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
                highlightBorderWidth: 0.5
            },
            "fills": {
                "Forecast": '#ccccff',
                "Current": '#ff9999',
                "Current/Forecast": '#ff5c33',
                "Volunteer": '#ffcc99',
                "defaultFill": '#DDDDDD'
            },
            "data": aMapData,
            "done": function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    //load fema news by state
                    $scope.loadFemaNewsByState(geography.properties.name);
                });

                datamap.svg.call(d3.behavior.zoom().scaleExtent([1, 5]).on("zoom", redraw));

                function redraw() {
                    datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                }
            }
            //,"responsive": true
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
                var html = '<div class="hoverinfo"><h4>Volunteers</h4>';

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

    /**
     * create scope of list disasters/volunteer by state
     * @param String state
     * @returns void
     */
    $scope.loadListByState = function(state) {
        $scope.aStateDisasters = [];
        $scope.aStateVolunteers = [];

        if(state !== '' && state !== null) {
            $scope.aStateDisasters = $scope.aDisasters[state];
            $scope.aStateVolunteers = $scope.aVolunteers[state];
            //load fema news by state
            $scope.loadFemaNewsByState(state);
        } else {
            //load fema news region
            $scope.loadFemaNewsRegion();
        }
    };

    /**
     * FEMA news region
     * @returns Void()
     */
    $scope.loadFemaNewsRegion = function() {
        ApiInterfaceService.call('femaNews', '', {}).then(
            function(data){ //success
                var x2js = new X2JS();
                var femaNewsData = x2js.xml_str2json( data );
                $scope.femaNewsData = femaNewsData.rss.channel.item;
            }, 
            function(error) { //error
                console.log(error);
            }
        );
    }

    /**
     * load fema news by state using Amazon Gateway API (to call google api - CORS work around)
     * @param String state
     * @returns void
     */
    $scope.loadFemaNewsByState = function(state) {
        //show spin
        usSpinnerService.spin('spinner');
        $scope.femaNewsData = [];

        var oGnParam = {
            "q":"fema disaster "+state,
            "rsz": 8
        };

        ApiInterfaceService.call('googleNews', '', oGnParam).then(
        function(data){ //success
            angular.forEach(data.responseData.results, function(row){
                $scope.femaNewsData.push({
                    "title": row.titleNoFormatting,
                    "description": row.content,
                    "link": row.unescapedUrl
                });
            });

            //stop spin
            usSpinnerService.stop('spinner');
        }, function(error) { //error
            console.log(error);
        });
    };

    //load fema region news
    $scope.loadFemaNewsRegion();
}]);
