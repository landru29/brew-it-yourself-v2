angular.module('brewItYourself').component('login',
{
  controllerAs: 'Login',
  controller: function($uibModal, Resource) {
    'use strict';

    this.isConnected = Resource.isConnected;

    this.logout = function() {
      return Resource.logout();
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
