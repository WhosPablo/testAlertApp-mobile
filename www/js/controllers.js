angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AlertsCtrl', function ($scope, Alert) {
  Alert.query().$promise.then(function (response) {
    $scope.alerts = response;
    console.log($scope.alerts);
  });

  $scope.doRefresh = function () {

    Alert.query().$promise
      .then(function (response) {
        $scope.alerts = response;
        console.log($scope.alerts);
      })
      .then(function () {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  };
})

.controller('AlertCtrl', function ($scope, Alert, $stateParams) {
  console.log($stateParams)

  Alert.get({id: $stateParams.alertId}).$promise.then(function (response) {
    $scope.alert = response;
    console.log($scope.alert);
  });
});
