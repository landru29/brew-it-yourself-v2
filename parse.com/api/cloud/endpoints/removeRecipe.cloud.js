'use strict';

/**
 * @params {String} id Identifier of the recipe to delete
 */
Parse.Cloud.define('removeRecipe', function(request, response) {
  var recipeQuery = new Parse.Query('recipe');
  recipeQuery.get(request.params.id, {
      success: function (recipe) {
          recipe.destroy({
              success: response.success,
              error: response.error
          });
      },
      error: function(model, status) {
        switch (status.code) {
          case 101:
            return response.error({
              code: 404,
              message: 'Not found'
            });
          default:
            return response.error({
              code: 500,
              message: 'Internal server error'
            });
        }
      }
  });
});
