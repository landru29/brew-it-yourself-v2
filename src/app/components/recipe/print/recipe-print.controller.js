angular.module('brewItYourself').controller('RecipePrintCtrl', function($stateParams, Resource, Recipe, Step) {
    'use strict';
    var self = this;


    function init() {
        self.recipe = null;
        Resource.recipe.get($stateParams.id).then(
            function (recipe) {
                self.recipe = new Recipe(recipe);
            },
            function(err) {
              toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
            }
        );
    }

    init();
});
