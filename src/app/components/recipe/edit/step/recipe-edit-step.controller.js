angular.module('brewItYourself').controller('RecipeEditStepCtrl', function($scope, RECIPE_ICONS, BeerSugar, UnitsConversion) {
    'use strict';
    var self = this;

    this.step = $scope.step;

    this.icons = RECIPE_ICONS;

    this.remove = function(steps, step) {
      _.remove(steps, step);
    };

    this.removeIngredient = function(ingredients, ingredient) {
      _.remove(ingredients, ingredient);
    };

    this.addIngredient = function(step) {

    };

  });
