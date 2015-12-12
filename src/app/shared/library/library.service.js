angular.module('brewItYourself').service('Library', function($uibModal) {

  this.pickIngredient = function() {
    return $uibModal.open({
      templateUrl: 'app/shared/library/library.modal.html',
      controller: 'LibraryModalController',
      controllerAs: 'LibraryModal'
    }).result;
  };

});
