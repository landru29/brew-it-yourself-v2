angular.module('brewItYourself').service('ResourceNoopyApiRecipe', function($resource, $q) {

  var recipeResource = $resource('noopy-api/me/beer', {}, {
      getOne: {
        method: 'get',
        url: 'noopy-api/me/beer/read/:recipeId',
        interceptor: {
          response: function(response) {
            return response.data.data;
          },
          responseError: function(response) {
            return $q.reject(response.data.message);
          }
        }
      },
      create: {
        url: 'noopy-api/me/beer',
        method: 'POST',
        interceptor: {
          response: function(response) {
            return response.data.data;
          },
          responseError: function(response) {
            return $q.reject(response.data.message);
          }
        }
      },
      destroy: {
        url: 'noopy-api/me/beer/:recipeId',
        method: 'DELETE',
        interceptor: {
          responseError: function(response) {
            return $q.reject(response.data.message);
          }
        }
      },
      save: {
        url: 'noopy-api/me/beer/:recipeId',
        method: 'PUT',
        interceptor: {
          response: function(response) {
            return response.data.data;
          },
          responseError: function(response) {
            return $q.reject(response.data.message);
          }
        }
      },
      list: {
        url: 'noopy-api/me/beer/list',
        method: 'GET',
        interceptor: {
          responseError: function(response) {
            return $q.reject(response.data.message);
          }
        }
      }
    });

  this.get = function(id) {
    return recipeResource.getOne({recipeId: id}).$promise;
  };

  this.create = function(model) {
    model = model ? model : {};
    return recipeResource.create({}, {
        name: model.name ? model.name : 'New recipe',
        date: model.date ? model.date : (new Date()).toISOString(),
        steps: model.steps ? model.steps : []
      }).$promise;
  };

  this.remove = function(id) {
    return recipeResource.destroy({recipeId: id}).$promise;
  };

  this.save = function(recipe) {
    return recipeResource.save({recipeId: recipe.id}, {
        name: recipe.name ? recipe.name : 'New recipe',
        date: recipe.date ? recipe.date : (new Date()).toISOString(),
        steps: recipe.steps ? recipe.steps : []
      }).$promise;
  };

  this.list = function(options) {
    return recipeResource.list(options).$promise;
  };

});
