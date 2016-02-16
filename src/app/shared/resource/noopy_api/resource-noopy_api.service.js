angular.module('brewItYourself').service('ResourceNoopyApi', function($injector, appConfiguration, Noopy) {

   Noopy.setApplicationId(appConfiguration.apiNoopyFr.applicationId);

   Noopy.setBaseUrl(appConfiguration.apiNoopyFr.url);

  this.user = $injector.get('ResourceNoopyApiUser');
  this.recipe = $injector.get('ResourceNoopyApiRecipe');

});