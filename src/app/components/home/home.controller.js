angular.module('brewItYourself').controller('HomeCtrl',
	function($state, Resource) {

		function init() {
			if (Resource.user.isConnected()) {
				$state.go('recipe-list');
			}
		}

		init();
	}
);
