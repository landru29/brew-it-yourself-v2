angular.module('brewItYourself').config(
	function($stateProvider) {
		'use strict';
		$stateProvider.state('recipe-list', {
        url: '/recipe/list',
        controller: 'RecipeListCtrl',
        controllerAs: 'RecipeList',
        templateUrl: 'app/components/recipe/list/recipe-list.view.html',
        translations: [
            'components/recipe/list',
						'components/recipe'
        ]
    });
	}
);
