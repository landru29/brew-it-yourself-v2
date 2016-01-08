angular.module('brewItYourself').controller('RecipePrintCtrl',
  function($scope, $stateParams, $translate, Resource, Recipe, Step, toaster) {
    'use strict';
    var self = this;


    function init() {
        delete self.recipe;
        Resource.recipe.get($stateParams.id).then(
            function (recipe) {
                self.recipe = new Recipe(recipe);
            },
            function(err) {
              self.recipe = null;
              toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
            }
        );
    }

    $scope.$on('user', function() {
      init();
    });

    init();
});
