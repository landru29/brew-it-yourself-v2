angular.module('brewItYourself').service('LoaderFile', function($http, $q) {
    this.load = function(filename) {
        return $q(function(resolve, reject) {
            $http.get('assets/data/' + filename).then(
                function(response) {
                    resolve(response.data);
                },
                reject
            );
        });
    };
});
