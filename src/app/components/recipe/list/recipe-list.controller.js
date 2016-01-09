angular.module('brewItYourself').controller('RecipeListCtrl', function($scope, $state, Resource, toaster) {
    'use strict';
    var self = this;

    function init() {
      if (!Resource.user.isConnected()) {
				$state.go('home');
			} else {
        return self.load();
      }
    }

    self.load = function() {
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
    };

    $scope.$on('user', function() {
      init();
    });

    init();
});
