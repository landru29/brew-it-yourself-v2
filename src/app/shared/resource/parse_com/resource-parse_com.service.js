angular.module('brewItYourself').service('ResourceParseCom', function($http, $q, appConfiguration) {
  Parse.initialize(appConfiguration.parseCom.applicationId, appConfiguration.parseCom.javaScriptKey);

  this.load = function(id) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('getRecipe', {
        id: id
      }).then(function(recipe) {
        resolve(recipe);
      }, reject);
    });
  };

  this.login = function(username, password) {
    return Parse.User.logIn(username, password);
  };

  this.logout = function() {
    return Parse.User.logOut();
  };

  this.isConnected = function() {
    return Parse.User.current();
  };

  this.listRecipe = function() {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('listRecipes', {}).then(function(data) {
        resolve(data);
      }, reject);
    });
  };

});
