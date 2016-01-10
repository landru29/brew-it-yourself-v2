angular.module('brewItYourself').service('ResourceParseComRecipe', function($http, $q) {

  this.get = function(id) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('getRecipe', {
        id: id
      }).then(function(recipe) {
        resolve(recipe);
      }, function(rejection) {
        reject(rejection.error);
      });
    });
  };

  this.create = function(model) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('createRecipe', {
        model: model ? model.stringify() : null
      }).then(function(recipe) {
        resolve(recipe);
      }, function(rejection) {
        reject(rejection.error);
      });
    });
  };

  this.remove = function(id) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('removeRecipe', {
        id: id
      }).then(function() {
        resolve();
      }, function(rejection) {
        reject(rejection.error);
      });
    });
  };

  this.save = function(recipe) {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('saveRecipe', {
        data: recipe.stringify()
      }).then(function(recipe) {
        resolve(recipe);
      }, function(rejection) {
        reject(rejection.error);
      });
    });
  };

  this.list = function() {
    return $q(function(resolve, reject) {
      Parse.Cloud.run('listRecipes', {}).then(function(data) {
        resolve(data);
      }, function(rejection) {
        reject(rejection.error);
      });
    });
  };

});
