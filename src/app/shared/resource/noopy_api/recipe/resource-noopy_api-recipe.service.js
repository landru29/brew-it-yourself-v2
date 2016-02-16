angular.module('brewItYourself').service('ResourceNoopyApiRecipe', function($http, $q, Noopy) {

  this.get = function(id) {
    return $q(function(resolve, reject) {
      reject('Not implemented');
    });
  };

  this.create = function(model) {
    return $q(function(resolve, reject) {
      reject('Not implemented');
    });
  };

  this.remove = function(id) {
    return $q(function(resolve, reject) {
      reject('Not implemented');
    });
  };

  this.save = function(recipe) {
    return $q(function(resolve, reject) {
      reject('Not implemented');
    });
  };

  this.list = function(options) {
    var params = {};
    if ((options) && (options.perPage)) params.perPage = options.perPage;
    if ((options) && (options.page)) params.page = options.page;
    return $q(function(resolve, reject) {
      var url = 'noopy-api/me/beer/list';
      $http.get(url).then(function(response) {
        console.log(response);
        return resolve(response.data.data);
      }, function(err) {
        return reject(err);
      });
    });
  };

});
