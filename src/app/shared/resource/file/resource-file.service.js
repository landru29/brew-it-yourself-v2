angular.module('brewItYourself').service('ResourceFile', function($http, $q) {
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

    this.login = function(username, password) {
      return $q(function(resolve, reject) {
        resolve(username);
      });
    };

    this.logout = function() {
      return $q(function(resolve, reject) {
        resolve();
      });
    };

    this.isConnected = function() {
      return true;
    };

    this.listRecipe = function() {
      return $q(function(resolve, reject) {
        resolve({data: {id: "sample.json", name: "landreuse"}, count: 1});
      });
    };

});
