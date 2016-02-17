angular.module('brewItYourself').component('login',
{
  controllerAs: 'Login',
  controller: function($uibModal, $rootScope, Resource, Noopy) {
    'use strict';

    this.isConnected = Resource.user.isConnected;

    this.loginUrl = Resource.user.getLoginUrl;

   this.logout = function() {
      return Resource.user.logout().finally(function() {
        $rootScope.$broadcast('user');
        $state.go(
          $state.current,
          $stateParams, {
            reload: true
          }
        );
      });
    };

    this.login = function() {
      return $uibModal.open({
        templateUrl: 'app/shared/login/login.modal.html',
        controller: 'LoginModalController',
        controllerAs: 'LoginModal',
        size: 'sm'
      }).result;
    };

  },
  templateUrl: 'app/shared/login/login.html'
});
