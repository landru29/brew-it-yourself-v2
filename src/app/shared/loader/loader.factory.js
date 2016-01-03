angular.module('brewItYourself').factory('Loader', function($injector) {
    return {
        file: function() {
            return $injector.get('LoaderFile');
        },
        parse: function() {
            return $injector.get('LoaderParseCom');
        }
    };
});
