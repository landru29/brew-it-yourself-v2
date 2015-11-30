angular.module('brewItYourself').controller('RecipeEditCtrl', function(Loader) {
    'use strict';
    var self = this;
    
    function init() {
        self.recipe = {};
        Loader.file().load('sample.json').then(
            function (recipe) {
                self.recipe = recipe;
            },
            function(err) {
                console.log('ERR', err);
            }
        );
    }
    
    init();
});
                                            