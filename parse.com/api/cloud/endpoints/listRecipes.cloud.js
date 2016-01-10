'use strict';

var extend = require('cloud/libs/extend.js');

Parse.Cloud.define('listRecipes', function(request, response) {
  var params = extend({
    page: 1,
    perPage: 10
  }, request.params);

  var recipeQuery = new Parse.Query('recipe');
  recipeQuery.descending('updatedAt');
  recipeQuery.limit(params.perPage);
  recipeQuery.skip((params.page -1) * params.perPage);

  Parse.Promise.when([
    recipeQuery.find(),
    recipeQuery.count()
  ]).then(function(elements, counter) {
    response.success({
      data: elements.map(function(elt) {
        //var recipe = JSON.parse(elt);
        return {
          id: elt.id,
          name: elt.get('name')
        };
      }),
      count: counter,
      page: params.page,
      perPage: params.perPage
    });
  }, function(model, status) {
    return response.error({
      code: 500,
      message: 'Internal server error'
    });
  });
});
