angular.module('brewItYourself').controller('RecipeEditStepCtrl', function($scope, RECIPE_ICONS, BeerSugar) {
    'use strict';
    var self = this;

    this.step = $scope.step;

    this.icons = RECIPE_ICONS;

  });
