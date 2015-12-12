angular.module('brewItYourself').service('LibraryResource', function($resource, $cacheFactory) {
  var libraryCache = $cacheFactory('Library');
  var loader = $resource('assets/data/beer-database.json', {}, {
    get: {
      cache: libraryCache,
      isArray: false
    }
  });

  return loader;
});
