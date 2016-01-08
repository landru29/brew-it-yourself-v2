angular.module('brewItYourself').service('ResourceFileUser', function($q) {
    this.login = function(username, password) {
      return $q(function(resolve, reject) {
        resolve(username);
      });
    };

    this.logout = function() {
      return $q(function(resolve, reject) {
        resolve();
      });
    };

    this.isConnected = function() {
      return true;
    };

});
