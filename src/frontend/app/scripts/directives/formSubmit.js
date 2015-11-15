app.directive('formSubmit', function() {
  return {
    restrict: 'A',
    require: '^form',
    link: function ($scope, element, attrs, formCtrl) {
      element.on('submit', function() {
        //console.log('directive hit');
        if($scope.validateAddress()){
          formCtrl.$valid = false;
        }
        if (formCtrl.$valid) {
          //console.log($scope);
          $scope.submit();  
        }
        else {
          // service to display invalid inputs
          //console.log('invalid submission');
        }
      });
    }
  };
});