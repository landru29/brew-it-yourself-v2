angular.module('brewItYourself').service('Confirm', function($uibModal) {

  return function(question) {
    return $uibModal.open({
      templateUrl: 'app/shared/dialog/confirm/dialog-confirm.modal.html',
      controller: 'ConfirmModalController',
      controllerAs: 'ConfirmModal',
      resolve: {
        question: function () {
          return question;
        }
      }
    }).result;
  };

});
