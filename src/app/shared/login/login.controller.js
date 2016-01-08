angular.module('brewItYourself').controller('LoginModalController',
  function($uibModalInstance, $translate, Resource, toaster) {
  var self = this;

  this.ok = function() {
    Resource.user.login(self.username, self.password).then(function(){
      $uibModalInstance.close();
    }, function() {
      $uibModalInstance.close();
      toaster.pop({
                type: 'error',
                title: $translate.instant('error'),
                body: $translate.instant('login_error'),
                showCloseButton: true
            });
    });
  };

  this.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

});
