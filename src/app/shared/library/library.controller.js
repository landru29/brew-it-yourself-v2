angular.module('brewItYourself').controller('LibraryModalController',
  function(LibraryResource, $uibModalInstance, $translate, $cacheFactory, toaster, UnitsConversion) {
  var self = this;

  this.selected = null;

  this.ok = function(selection, unit, type) {
    self.selected = selection ? selection : self.selected;
    self.selected.qty = {
      unit: unit,
      value: 0
    };
    self.selected.type = type ? type : self.selected.type;
    $uibModalInstance.close(self.selected);
  };

  this.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  function reformatLib(data) {
    var thisLibrary = [];
    _.forEach(data, function(ingredientList, type) {
      if (!/^\$.*/.test(type)) {
        var unit;
        switch (type) {
          case 'fermentable':
            unit=UnitsConversion.getPhysicalUnits('mass.kg');
            ingredientList.sort(function(a, b) {
              var _a = parseFloat('' + a.color);
              var _b = parseFloat('' + b.color);
              if (_a>_b) return 1;
              if (_a<_b) return -1;
              return 0;
            });
            ingredientList.forEach(function(ingredient) {
              ingredient._rgb =  UnitsConversion.fromTo(parseFloat(ingredient.color), 'color.ebc', 'color.rgb');
            });
            break;
          case 'water':
            unit=UnitsConversion.getPhysicalUnits('volume.l');
            break;
          case 'hop':
            ingredientList.sort(function(a, b) {
              var _a = parseFloat('' + a.alpha);
              var _b = parseFloat('' + b.alpha);
              if (_a>_b) return 1;
              if (_a<_b) return -1;
              return 0;
            });
            unit = UnitsConversion.getPhysicalUnits('mass.g');
            break;
          default:
          unit = UnitsConversion.getPhysicalUnits('mass.g');
        }
        thisLibrary.push({
          unit: unit,
          type: type,
          ingredientList: ingredientList
        });
      }
    });
    return thisLibrary;
  }

  function init() {
    var cache = $cacheFactory.get('libraryCache') ? $cacheFactory.get('libraryCache') : $cacheFactory('libraryCache');
    self.library = cache.get('data');
    if (!self.library) {
      self.loading = true;
      LibraryResource.get().$promise.then(function(data){
        self.library = reformatLib(data);
        cache.put('data', self.library);
      }, function(err) {
        toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
      }).finally(function() {
        self.loading = false;
      });
    }
  }

  init();

});
