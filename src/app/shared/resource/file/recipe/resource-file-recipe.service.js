angular.module('brewItYourself').service('ResourceFileRecipe', function($http, $q) {
    this.get = function(filename) {
        return $q(function(resolve, reject) {
            $http.get('assets/data/' + filename).then(
                function(response) {
                    resolve(response.data);
                },
                reject
            );
        });
    };

    this.create = function(model) {
        return $q(function(resolve, reject) {
            $http.get('assets/data/sample.json').then(
                function(response) {
                    resolve(response.data);
                },
                reject
            );
        });
    };

    this.remove = function(id) {
      return $q(function(resolve) {
        resolve();
      });
    };

    this.save = function(id) {
      return $q(function(resolve) {
        resolve();
      });
    };

    this.list = function() {
      return $q(function(resolve, reject) {
        resolve({data: {id: "sample.json", name: "landreuse"}, count: 1});
      });
    };

});
