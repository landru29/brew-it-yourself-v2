angular.module('brewItYourself').service('ResourceNoopyApiUser', function($q, Login, Noopy) {


  this.logout = function() {
    return $q(function(resolve) {
      Login.logout();
      resolve();
    });
  };

  this.login = function(username, password) {
    return $q(function(resolve, reject) {
      reject('Not implemented');
    });
  };

  this.getLoginUrl = Noopy.getLoginUrl;

  this.isConnected = Login.isLoggedIn;

});