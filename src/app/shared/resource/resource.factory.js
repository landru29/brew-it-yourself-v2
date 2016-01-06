angular.module('brewItYourself').factory('Resource', function($injector, appConfiguration) {
    return $injector.get('Resource' + _.capitalize(appConfiguration.loader));
});
