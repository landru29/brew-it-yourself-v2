'use strict';

/**
 * @params {String} data Recipe data (jason)
 */
Parse.Cloud.define('saveRecipe', function(request, response) {
  var recipeQuery = new Parse.Query('recipe');
  var data = JSON.parse(request.params.data);
  recipeQuery.get(data.id, {
      success: function (recipe) {
          recipe.set('data', JSON.stringify(data));
          recipe.set('name', data.name);
          recipe.save(null, {
              success: function(newRecipe) {
                var recipeData = JSON.parse(newRecipe.get('data'))
                recipeData.id = newRecipe.id;
                response.success(recipeData);
              },
              error: response.error
          });
      },
      error: response.error
  });
});
