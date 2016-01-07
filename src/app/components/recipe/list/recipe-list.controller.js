angular.module('brewItYourself').controller('RecipeListCtrl', function(Resource, toaster) {
    'use strict';
    var self = this;

    function init() {
        self.isLoading = true;
        self.recipeList = [];
        Resource.listRecipe().then(
            function (data) {
                self.recipeList = data.data;
            },
            function(err) {
              toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
            }
        ).finally(function() {
          self.isLoading = false;
        });
    }

    init();
});
