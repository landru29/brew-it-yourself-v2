angular.module('brewItYourself').controller('RecipeEditCtrl', function($stateParams, Loader, Recipe, Step) {
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
                console.log('ERR', err);
            }
        );
    }

    this.addStep = function(steps) {
      steps.push(new Step());
    };

    init();
});
