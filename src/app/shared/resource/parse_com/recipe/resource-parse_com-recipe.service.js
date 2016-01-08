angular.module('brewItYourself').service('ResourceParseComRecipe', function($http, $q) {

  this.get = function(id) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('getRecipe', {
        id: id
      }).then(function(recipe) {
        resolve(recipe);
      }, reject);
    });
  };

  this.list = function() {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('listRecipes', {}).then(function(data) {
        resolve(data);
      }, reject);
    });
  };

});
