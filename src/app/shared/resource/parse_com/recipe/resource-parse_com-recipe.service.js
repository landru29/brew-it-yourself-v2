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

  this.create = function(model) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('createRecipe', {
        model: model
      }).then(function(recipe) {
        resolve(recipe);
      }, reject);
    });
  };

  this.remove = function(id) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('removeRecipe', {
        id: id
      }).then(function() {
        resolve();
      }, reject);
    });
  };

  this.save = function(recipe) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('saveRecipe', {
        data: JSON.stringify(recipe)
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
