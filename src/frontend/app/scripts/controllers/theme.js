app.controller('NavCtrl', function ($scope, $timeout, $mdSidenav, $mdDialog) {
      $scope.toggleLeft = buildDelayedToggler('left');
      /**
       * Navigate to url
       */
      $scope.navigateTo = function(to, event){
        $mdDialog.show(
          $mdDialog.alert()
          .title('Navigating')
          .content('Imagine being taken to ' + to)
          .ariaLabel('Navigation demo')
          .ok('Ok')
          .targetEvent(event)
        );
      };
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

    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav) {
      $scope.close = function () {
        $mdSidenav('left').close();
      };
    })
    .config(function($mdThemingProvider) {
      // Extend the red theme with a few different colors
      var darkBlueMap = $mdThemingProvider.extendPalette('indigo', {
        '500': '112e51',
        'A400': '981b1e'
      });
      // Register the new color palette map with the name <code>neonRed</code>
      $mdThemingProvider.definePalette('darkBlue', darkBlueMap);
      // Use that theme for the primary intentions
      $mdThemingProvider.theme('default')
        .primaryPalette('darkBlue')
        .accentPalette('darkBlue',{
          'default': 'A400'
        });
    });
