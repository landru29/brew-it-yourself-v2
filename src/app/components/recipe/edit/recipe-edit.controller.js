angular.module('brewItYourself').controller('RecipeEditCtrl', function($stateParams, Loader, Recipe, Step, toaster) {
    'use strict';
    var self = this;

    this.sortableOptions = {
      handle: '.sortableHandle'
    };

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

    this.addStep = function(steps) {
      steps.push(new Step());
    };

    init();
});
