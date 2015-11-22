angular.module('starter.services', [])

.factory('Alert', function ($resource) {
  return $resource("https://ippd-test-app.herokuapp.com/alerts/:id.json");

})

.service('loginService', ['$rootScope', '$q', 'RESOURCES', '$window', '$auth',
  function ($rootScope, $q, RESOURCES, $window, $auth) {
    var _this = this;

    this.originUrl = $window.location.origin;
    this.authUrl = RESOURCES.baseUrl + RESOURCES.signInUrl + _this.originUrl

    this.authenticate = function () {
      var defer = $q.defer();
      var browserWindow = $window.open(_this.authUrl, '_blank', 'location=no');

      browserWindow.addEventListener('loadstop', function (event) {
        if (event.url.match(RESOURCES.baseUrl)) {
          browserWindow.executeScript(
            {code: 'getCredentials()'},

            function (response) {
              var rsp = response[0];

              if (rsp.message == 'deliverCredentials') {
                var user = rsp.data;

                // Set the user in ng-token-auth
                $auth.initDfd();
                $auth.handleValidAuth(user, true);

                // emit a successful login
                $rootScope.$emit('auth:login-success', user)
                defer.resolve(user);
              } else {
                $rootScope.$emit('auth:login-error', rsp.error)
                defer.reject(rsp.error);
              }
              ;

              // Finished with InAppBrowser
              browserWindow.close();
            }
          );
        }
        ;
      });

      return defer.promise;
    };
  }
]);
