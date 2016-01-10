angular.module('brewItYourself').controller('RecipeListCtrl',
function($scope, $state, $translate, Resource, toaster, Recipe) {
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

    self.add = function() {
      self.adding = true;
      Resource.recipe.create().then(
          function (recipe) {
              if (recipe.id) {
                $state.go('recipe-edit', {id: recipe.id});
              }
          },
          function(err) {
            self.recipe = null;
            toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
          }
      ).finally(function() {
        self.adding = false;
      });
    };

    self.import = function() {
      try {
        var recipeData = JSON.parse(self.importData);
        var recipe = new Recipe(recipe);

        self.importing = true;
        Resource.recipe.create(recipe).then(
            function (recipe) {
                if (recipe.id) {
                  $state.go('recipe-edit', {id: recipe.id});
                }
            },
            function(err) {
              self.recipe = null;
              toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
            }
        ).finally(function() {
          self.importing = false;
        });

      } catch (e) {
        toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(e));
      }
    };

    self.remove = function(recipe) {
      recipe.removing = true;
      Resource.recipe.remove(recipe.id).then(
          function () {
            var index = self.recipeList.indexOf(recipe);
            if (index>-1) {
              self.recipeList.splice(index, 1);
              RecipeList.recipeCount--;
            }
          },
          function(err) {
            self.recipe = null;
            toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
          }
      ).finally(function() {
        delete recipe.removing;
      });
    };

    $scope.$on('user', function() {
      init();
    });

    init();
});
