angular.module('brewItYourself').controller('RecipeListCtrl', function($scope, Resource, toaster) {
    'use strict';
    var self = this;

    function init() {
        self.isLoading = true;
        self.recipeList = [];
        self.recipeCount = null;
        Resource.recipe.list().then(
            function (data) {
                self.recipeList = data.data;
                self.recipeCount = data.count;
            },
            function(err) {
              toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
            }
        ).finally(function() {
          self.isLoading = false;
        });
    }

    $scope.$on('user', function() {
      init();
    });

    init();
});
