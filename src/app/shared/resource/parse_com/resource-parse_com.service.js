angular.module('brewItYourself').service('ResourceParseCom', function($injector, appConfiguration) {
  Parse.initialize(
    appConfiguration.parseCom.applicationId,
    appConfiguration.parseCom.javaScriptKey
  );

  this.user = $injector.get('ResourceParseComUser');
  this.recipe = $injector.get('ResourceParseComRecipe');

});
