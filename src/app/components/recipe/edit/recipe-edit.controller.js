angular.module('brewItYourself').controller('RecipeEditCtrl',
  function($scope, $rootScope, $stateParams, $state, $translate, $q, $localStorage, Confirm, Resource, Recipe, Step, toaster) {
    'use strict';
    var self = this;

    this.sortableOptions = {
      handle: '.sortableHandle'
    };

    function init() {
      if (!Resource.user.isConnected()) {
        self.setSaveFag(false);
        delete $localStorage.currentRecipe;
        delete $localStorage.recipeCancel;
        return $state.go('home');
      }
      if (($localStorage.currentRecipe) && ($localStorage.recipeForce)) {
        self.recipe = $localStorage.currentRecipe;
        self.setWatcher();
        delete $localStorage.recipeForce;
        return;
      }
      if ((self.needSave()) && ($localStorage.currentRecipe)) {
        return new Confirm($translate.instant('recipe_edit_backup_confirm', {
          id: $localStorage.currentRecipe.id,
          name: $localStorage.currentRecipe.name
        })).then(function() {
          $localStorage.recipeForce = true;
          $state.go(
            $state.current,
            {
              id: $localStorage.currentRecipe.id
            }, {
              reload: true
            }
          );
        }, function(){
          self.load();
        });
      } else {
        return self.load();
      }
    }

    this.needSave = function() {
      return $localStorage.recipeNotSaved;
    };

    this.setSaveFag = function(flag) {
      if (flag) {
        $localStorage.recipeNotSaved = true;
      } else {
        delete $localStorage.recipeNotSaved;
      }
    };

    this.load = function() {
        delete self.recipe;
        Resource.recipe.get($stateParams.id).then(
            function (recipe) {
                self.recipe = new Recipe(recipe);
                $localStorage.currentRecipe = self.recipe;
                self.toCancel();
                self.setWatcher();
            },
            function(err) {
              self.recipe = null;
              toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
            }
        );
    };

    this.setWatcher = function() {
      return $scope.$watch('RecipeEdit.recipe', function(a, b) {
        self.setSaveFag(JSON.stringify(self.recipe) !== JSON.stringify($localStorage.recipeCancel));
      }, true);
    };

    this.toCancel = function() {
      $localStorage.recipeCancel = JSON.parse(JSON.stringify(self.recipe));
      self.setSaveFag(false);
    };

    this.save = function() {
      return $q(function(resolve, reject) {
        // save to database
        self.toCancel();
        self.setSaveFag(false);
        resolve();
      });
    };

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
      if ((fromState.name === 'recipe-edit') &&
          (self.recipe) &&
          ($localStorage.recipeCancel) &&
          (JSON.stringify(self.recipe) !== JSON.stringify($localStorage.recipeCancel))) {
        if (!$localStorage.recipeForce) {
          event.preventDefault();
          return new Confirm($translate.instant('recipe_edit_save_confirm', {name: self.recipe.name})).then(
            function() {
              self.toCancel();
              $state.go(toState, toParams);
            }
          );
        }
      }
    });

    this.addStep = function(steps) {
      steps.push(new Step());
    };

    $scope.$on('user', function() {
      init();
    });

    init();
});
