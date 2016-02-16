angular.module('brewItYourself').service('ResourceNoopyApiRecipe', function($http, $q) {

  this.get = function(id) {
    return $q(function(resolve, reject) {
      $http.get('noopy-api/me/beer/read/' + id).then(function(response) {
        var newRecipe = response.data.data;
        recipe.id = _id;
        return resolve(recipe);
      }, function(err) {
        return reject(err);
      });
    });
  };

  this.create = function(model) {
    model = model ? model : {};
    return $q(function(resolve, reject) {
      $http.post('noopy-api/me/beer', {
        name: model.name ? model.name : 'New recipe',
        date: model.date ? model.date : (new Date()).toISOString(),
        steps: model.steps ? model.steps : []
      }).then(function(response) {
        var newRecipe = response.data.data;
        newRecipe.id = _id;
        return resolve(newRecipe);
      }, function(err) {
        return reject(err);
      });
    });
  };

  this.remove = function(id) {
    return $q(function(resolve, reject) {
      $http.delete('noopy-api/me/beer/' + id).then(function(response) {
        return resolve(response.data);
      }, function(err) {
        return reject(err);
      });
    });
  };

  this.save = function(recipe) {
    return $q(function(resolve, reject) {
      $http.put('noopy-api/me/beer/' + recipe.id, {
        name: recipe.name ? model.name : 'New recipe',
        date: recipe.date ? model.date : (new Date()).toISOString(),
        steps: recipe.steps ? model.steps : []
      }).then(function(response) {
        var newRecipe = response.data.data;
        newRecipe.id = _id;
        return resolve(newRecipe);
      }, function(err) {
        return reject(err);
      });
    });
  };

  this.list = function(options) {
    var params = {};
    if ((options) && (options.perPage)) params.perPage = options.perPage;
    if ((options) && (options.page)) params.page = options.page;
    return $q(function(resolve, reject) {
      $http.get('noopy-api/me/beer/list').then(function(response) {
        var recipeList = _.isArray(response.data.data) ? response.data.data : [];
        recipeList.forEach(function(recipe){
          recipe.id = recipe._id;
        });
        return resolve(recipeList);
      }, function(err) {
        return reject(err);
      });
    });
  };

});
