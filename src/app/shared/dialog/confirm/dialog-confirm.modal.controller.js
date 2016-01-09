angular.module('brewItYourself').controller('ConfirmModalController',
  function($uibModalInstance, question) {
  var self = this;

  this.ok = function() {
    $uibModalInstance.close();
  };

  this.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  this.question = question;

});
