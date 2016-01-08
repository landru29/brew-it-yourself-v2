angular.module('brewItYourself').controller('RecipeEditCtrl',
  function($scope, $stateParams, $translate, Resource, Recipe, Step, toaster) {
    'use strict';
    var self = this;

    this.sortableOptions = {
      handle: '.sortableHandle'
    };

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

    this.addStep = function(steps) {
      steps.push(new Step());
    };

    $scope.$on('user', function() {
      init();
    });

    init();
});
