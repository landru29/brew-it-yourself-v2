'use strict';

Parse.Cloud.define('getRecipe', function(request, response) {
  var recipeQuery = new Parse.Query('recipe');
  recipeQuery.get(request.params.id, {
    success: function(recipe) {
      response.success(JSON.parse(recipe.get('data')));
    },
    error: response.error
  });
});
