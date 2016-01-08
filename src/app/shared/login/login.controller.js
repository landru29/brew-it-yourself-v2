angular.module('brewItYourself').controller('LoginModalController',
  function($uibModalInstance, $translate, $rootScope, Resource, toaster) {
  var self = this;

  this.ok = function() {
    Resource.user.login(self.username, self.password).then(function(){
      $rootScope.$broadcast('user');
    }, function() {
      toaster.pop({
                type: 'error',
                title: $translate.instant('error'),
                body: $translate.instant('login_error'),
                showCloseButton: true
            });
    }).finally(function(){
      $uibModalInstance.close();
    });
  };

  this.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

});
