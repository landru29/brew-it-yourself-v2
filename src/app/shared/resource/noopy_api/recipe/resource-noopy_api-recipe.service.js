angular.module('brewItYourself').service('ResourceNoopyApiRecipe', function($resource) {

  this.get = function(id) {
    return $resource('noopy-api/me/beer/read/:recipeId', {}, {
      get: {
        interceptor: {
          response: function(response) {
            return response.data.data;
          }
        }
      }
    }).get({recipeId: id}).$promise;
  };

  this.create = function(model) {
    model = model ? model : {};
    return $resource('noopy-api/me/beer', {}, {
      create: {
        method: 'POST',
        interceptor: {
          response: function(response) {
            return response.data.data;
          }
        }
      }
    }).create({}, {
        name: model.name ? model.name : 'New recipe',
        date: model.date ? model.date : (new Date()).toISOString(),
        steps: model.steps ? model.steps : []
      }).$promise;
  };

  this.remove = function(id) {
    return $resource('noopy-api/me/beer/:recipeId').delete({recipeId: id}).$promise;
  };

  this.save = function(recipe) {
    return $resource('noopy-api/me/beer/:recipeId', {}, {
      save: {
        method: 'PUT',
        interceptor: {
          response: function(response) {
            return response.data.data;
          }
        }
      }
    }).save({recipeId: recipe.id}, {
        name: recipe.name ? recipe.name : 'New recipe',
        date: recipe.date ? recipe.date : (new Date()).toISOString(),
        steps: recipe.steps ? recipe.steps : []
      }).$promise;
  };

  this.list = function(options) {
    return $resource('noopy-api/me/beer/list').get(options).$promise;
  };

});
