angular.module('brewItYourself').controller('LibraryModalController',
  function(LibraryResource, $uibModalInstance, $translate, toaster, UnitsConversion) {
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

  function getUnit(id) {
    var allUnits = UnitsConversion.getPhysicalUnits();
    var matcher = id.match(/(([\w-]*)\.)?(.*)/);
    if (matcher) {
      var family = _.find(allUnits, {type:matcher[2]});
      if (family) {
        var unit = _.find(family.units, {id:id});
        if (unit) {
          unit.type = unit.id;
          delete unit.id;
        }
        return unit;
      }
    }
    return null;
  }

  function reformatLib(data) {
    var thisLibrary = [];
    _.forEach(data, function(ingredientList, type) {
      if (!/^\$.*/.test(type)) {
        var unit;
        switch (type) {
          case 'fermentable':
            unit=getUnit('mass.kg');
            ingredientList.sort(function(a, b) {
              var _a = parseFloat('' + a.color);
              var _b = parseFloat('' + b.color);
              if (_a>_b) return 1;
              if (_a<_b) return -1;
              return 0;
            });
            break;
          case 'water':
            unit=getUnit('volume.l');
            break;
          case 'hop':
            ingredientList.sort(function(a, b) {
              var _a = parseFloat('' + a.alpha);
              var _b = parseFloat('' + b.alpha);
              if (_a>_b) return 1;
              if (_a<_b) return -1;
              return 0;
            });
            unit = getUnit('mass.g');
            break;
          default:
          unit = getUnit('mass.g');
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
    var allUnits = UnitsConversion.getPhysicalUnits();
    self.library = [];
    self.loading = true;
    LibraryResource.get().$promise.then(function(data){
      self.library = reformatLib(data);
    }, function(err) {
      toaster.pop('error', $translate.instant('error_occured'), JSON.stringify(err));
      console.log(err);
    }).finally(function() {
      self.loading = false;
    });
  }

  init();

});
