angular.module('brewItYourself').controller('RecipePrintCtrl', function(Loader, Recipe, Step) {
    'use strict';
    var self = this;


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
