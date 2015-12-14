angular.module('brewItYourself').config(
	function($stateProvider) {
		'use strict';
		$stateProvider.state('recipe-print', {
        url: '/recipe/:id/print',
        controller: 'RecipePrintCtrl',
        controllerAs: 'RecipePrint',
        templateUrl: 'app/components/recipe/print/recipe-print.view.html',
        translations: [
            'components/recipe/print',
						'components/recipe'
        ]
    });
	}
);
