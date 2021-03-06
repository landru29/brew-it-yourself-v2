'use strict';

var extend = require('cloud/libs/extend.js');

/**
 * @params {String} model Model to create the recipe (json) [optional]
 */
Parse.Cloud.define('createRecipe', function(request, response) {

  if (!Parse.User.current()) {
    return response.error({
      code: 401,
      message: 'You must be connected'
    });
  }

  var maxRecipe = Parse.User.current().get('maxRecipe');
  var recipeQuery = new Parse.Query('recipe');
  if ((maxRecipe < 0 ) || (recipeQuery.count() < maxRecipe)) {
    var Recipe = Parse.Object.extend('recipe');
    var recipe = new Recipe();
    var model = extend({
      name: 'My beer',
      date: (new Date()).toISOString(),
      author: Parse.User.current().get('username'),
      steps: []
    }, request.params.model ? JSON.parse(request.params.model) : {});
    recipe.set('name', model.name);
    recipe.set('data', JSON.stringify(model));
    recipe.save(null, {
      success: function(newRecipe) {
        var recipeData = JSON.parse(newRecipe.get('data'))
        recipeData.id = newRecipe.id;
        response.success(recipeData);
      },
      error: function() {
        response.error({
          code: 500,
          message: 'Could not create a new recipe'
        });
      }
    });
  } else {
    response.error({
      code: 403,
      message: 'You reached the maximum recipes'
    });
  }
});

Parse.Cloud.afterSave('recipe', function(request) {
  var user = Parse.User.current();
  // check if the object was just created
  if (request.object.existed() === false) {
    var newACL = new Parse.ACL();
    newACL.setPublicReadAccess(false);
    newACL.setPublicWriteAccess(false);
    newACL.setReadAccess(user.id, true);
    newACL.setWriteAccess(user.id, true);
    request.object.setACL(newACL);
    request.object.save();
  }
});
