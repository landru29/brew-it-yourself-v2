angular.module('brewItYourself').service('LoaderParseCom', function($http, $q, appConfiguration) {
    Parse.initialize(appConfiguration.parseCom.applicationId, appConfiguration.parseCom.javaScriptKey);
    this.load = function(id) {
        return $q(function(resolve, reject) {
          Parse.Cloud.run('getRecipe', { id: id }).then(function(recipe) {
            resolve(JSON.parse(recipe));
          }, reject);
        });
    };
});
