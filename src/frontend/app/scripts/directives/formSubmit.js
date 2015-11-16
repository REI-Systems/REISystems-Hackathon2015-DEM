'use strict';

//directives related to form submission
app.directive('formSubmit', function() {
  return {
    restrict: 'A',
    require: '^form',
    link: function ($scope, element, attrs, formCtrl) {
      element.on('submit', function() {
        var res = $scope.validateAddress();
        if(res){
          res.then(function(resolve){
            if(!resolve){
              formCtrl.$valid = false;
              $scope.generalMessage = "Invalid Address, please check your address and state";
              $scope.registrationForm.formAddress.$setValidity('address', false);
            }
            if (formCtrl.$valid) {
              $scope.submit();  
            }
          },function(reject){
            //couldn't connect to api to validate address, skipping
            if (formCtrl.$valid) {
              $scope.submit();  
            }
          });
        }
        
      });
    }
  };
});
var ZIPCODE_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
app.directive('zipcode', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.zipcode = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }
        if (ZIPCODE_REGEX.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
var PHONE_REGEX = /(^\d{10}$)|(^\(\d{3}\)\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)|(^\d{3}-\d{3}-\d{4}$)/;
app.directive('phone', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.phone = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }
        if (PHONE_REGEX.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});