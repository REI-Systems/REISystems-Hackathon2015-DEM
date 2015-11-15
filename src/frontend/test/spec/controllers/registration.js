'use strict';

describe('Controller: RegistrationCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var RegistrationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationCtrl = $controller('RegistrationCtrl', {
      $scope: scope
    });
  }));


  //specs
  describe('static date tests', function(){
    it('should have disaster interest options',function(){
      var opt = scope.disasterInterestOptions.length > 0;
      expect(opt).toBeGreaterThan(0);
    });
    it('should have assistance interest options',function(){
      var opt = scope.assistanceInterestOptions.length > 0;
      expect(opt).toBeGreaterThan(0);
    });
    it('should have service interest options',function(){
      var opt = scope.serviceInterestOptions.length > 0;
      expect(opt).toBeGreaterThan(0);
    });
    it('should have compensation type options',function(){
      var opt = scope.compensationTypeOptions.length > 0;
      expect(opt).toBeGreaterThan(0);
    });
  });
  describe("async tests", function(){
    it('should get the state options',function(){
      scope.loadStateOptions();
      setTimeout(function() {
        var opt = scope.stateOptions.length > 0;
        expect(opt).toBeGreaterThan(0);
        done();
      }, 3000);
    });
    it('should get the past disaster options',function(){
      scope.loadPastDisasterOptions();
      setTimeout(function() {
        var opt = scope.disasterParticipationOptions.length > 0;
        expect(opt).toBeGreaterThan(0);
        done();
      }, 3000);
    });
  });
});
