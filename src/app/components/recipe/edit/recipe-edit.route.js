angular.module('brewItYourself').config(
	function($stateProvider) {
		'use strict';
		$stateProvider.state('recipe-edit', {
        url: '/recipe/:id/edit',
        controller: 'RecipeEditCtrl',
        controllerAs: 'RecipeEdit',
        templateUrl: 'app/components/recipe/edit/recipe-edit.view.html',
        translations: [
            'components/recipe/edit'
        ]
    });
	}
);