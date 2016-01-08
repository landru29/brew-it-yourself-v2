angular.module('brewItYourself').service('ResourceFile', function($injector) {
    this.user = $injector.get('ResourceFileUser');
    this.recipe = $injector.get('ResourceFileRecipe');
});
