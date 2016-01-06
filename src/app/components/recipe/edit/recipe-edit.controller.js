angular.module('brewItYourself').controller('RecipeEditCtrl', function($stateParams, Resource, Recipe, Step, toaster) {
    'use strict';
    var self = this;

    this.sortableOptions = {
      handle: '.sortableHandle'
    };

    function init() {
        self.recipeId = $stateParams.id;
        self.recipe = {};
        Resource.load(self.recipeId).then(
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
