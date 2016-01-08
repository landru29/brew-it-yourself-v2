'use strict';

Parse.Cloud.define('getRecipe', function(request, response) {
  var recipeQuery = new Parse.Query('recipe');
  recipeQuery.get(request.params.id, {
    success: function(recipe) {
      var recipeData = JSON.parse(recipe.get('data'))
      recipeData.id = recipe.id;
      response.success(recipeData);
    },
    error: response.error
  });
});
