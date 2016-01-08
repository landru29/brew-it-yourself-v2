angular.module('brewItYourself').service('ResourceParseComUser', function($q) {

  this.login = function(username, password) {
    return $q(function(resolve, reject) {
      Parse.User.logIn(username, password).then(resolve, reject);
    });
  };

  this.logout = function() {
    return $q(function(resolve) {
      Parse.User.logOut();
      resolve();
    });
  };

  this.isConnected = function() {
    return Parse.User.current();
  };

});
