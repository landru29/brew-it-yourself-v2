angular.module('brewItYourself').component('login',
{
  controllerAs: 'Login',
  controller: function($uibModal, $rootScope, Resource) {
    'use strict';

    this.isConnected = Resource.user.isConnected;

    this.logout = function() {
      return Resource.user.logout().finally(function() {
        $rootScope.$broadcast('user');
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