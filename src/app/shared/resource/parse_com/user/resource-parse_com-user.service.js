angular.module('brewItYourself').service('ResourceParseComUser', function($q) {

  this.login = function(username, password) {
    return Parse.User.logIn(username, password);
  };

  this.logout = function() {
    return Parse.User.logOut();
  };

  this.isConnected = function() {
    return Parse.User.current();
  };

});
