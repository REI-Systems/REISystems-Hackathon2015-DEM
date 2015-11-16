'use strict';

app.controller('NavCtrl', ['$scope', '$timeout', '$mdSidenav', function ($scope, $timeout, $mdSidenav) {
      $scope.toggleLeft = buildDelayedToggler('left');

      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
              args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }
      /**
       * Build handler to open/close a SideNav
       */
      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID).toggle();
        }, 200);
      }

    }])
    .controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', function ($scope, $timeout, $mdSidenav) {
      $scope.close = function () {
        $mdSidenav('left').close();
      };
    }]);