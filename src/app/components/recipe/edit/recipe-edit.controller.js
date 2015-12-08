angular.module('brewItYourself').controller('RecipeEditCtrl', function(Loader, Recipe) {
    'use strict';
    var self = this;

    this.sortableOptions = {
      handle: '.sortableHandle'
    };

    function init() {
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

    init();
});
