app.directive('formSubmit', function() {
  return {
    restrict: 'A',
    require: '^form',
    link: function ($scope, element, attrs, formCtrl) {
      element.on('submit', function() {
        //console.log('directive hit');
        var res = $scope.validateAddress();
        if(res){
          //console.log(res);
          res.then(function(resolve){
            if(!resolve){

              formCtrl.$valid = false;
              $scope.generalMessage = "Invalid Address";
              //$scope.registrationForm.formAddress.$error.address = true;
              $scope.registrationForm.formAddress.$setValidity('address', false);
              console.log($scope);//.registrationForm.formAddress);
              //alert('invalid address');
              //console.log($scope,formCtrl);
            }
            if (formCtrl.$valid) {
              //console.log($scope);
              $scope.submit();  
            }
            else {
              // service to display invalid inputs
              //console.log('invalid submission');
            }
          },function(reject){

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
        //console.log(ZIPCODE_REGEX);
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
var PHONE_REGEX = /(^\d{10}$)|(^\(\d{3}\)\d{3}-\d{4}$)|(^\d{3}-\d{3}-\d{4}$)/;
app.directive('phone', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.phone = function(modelValue, viewValue) {
        //console.log('phone directive');
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }
        //console.log(PHONE_REGEX);
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