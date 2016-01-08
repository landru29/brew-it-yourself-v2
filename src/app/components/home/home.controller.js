angular.module('brewItYourself').controller('HomeCtrl',
	function($state) {
		$state.go('recipe-list');

	}
);
