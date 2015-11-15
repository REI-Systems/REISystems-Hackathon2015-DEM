'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
  
  it('Function fema news by state empty array', function(){

    scope.loadFemaNewsByState('VA');

    expect(scope.femaNewsData.length).toBe(0);
  });

  it('Function load list by state empty array', function(){

    scope.aDisasters = {
        "VA":[]
    };
    scope.aVolunteers = {
        "VA":[]
    };

    scope.loadListByState('VA');

    expect(scope.aStateDisasters.length).toBe(0);
    expect(scope.aStateVolunteers.length).toBe(0);
  });
});
