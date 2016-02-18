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
      post: {
        interceptor: {
          response: function(response) {
            return response.data.data;
          }
        }
      }
    }).post({
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
      put: {
        interceptor: {
          response: function(response) {
            return response.data.data;
          }
        }
      }
    }).put({recipeId: id}, {
        name: recipe.name ? recipe.name : 'New recipe',
        date: recipe.date ? recipe.date : (new Date()).toISOString(),
        steps: recipe.steps ? recipe.steps : []
      }).$promise;
  };

  this.list = function(options) {
    return $resource('noopy-api/me/beer/list').get(options).$promise;
  };

});
