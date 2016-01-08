angular.module('brewItYourself').component('login',
{
  controllerAs: 'Login',
  controller: function($uibModal, Resource) {
    'use strict';

    this.isConnected = Resource.user.isConnected;

    this.logout = function() {
      return Resource.user.logout();
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
