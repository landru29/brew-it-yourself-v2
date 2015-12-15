angular.module('brewItYourself').controller('RecipePrintCtrl', function($stateParams, Loader, Recipe, Step) {
    'use strict';
    var self = this;


    function init() {
        self.recipeId = $stateParams.id;
        self.recipe = {};
        Loader.file().load('sample.json').then(
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
