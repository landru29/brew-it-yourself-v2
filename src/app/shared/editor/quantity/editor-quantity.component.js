angular.module('brewItYourself').component('editorQuantity',
{
  bindings: {
    qty: '=model',
    type: '@',
    accept: "&"
  },
  controllerAs: 'EditorQuantity',
  controller: ['$scope', 'UnitsConversion', function($scope, UnitsConversion) {
    'use strict';

    var self = this;

    function getAllUnits(unit) {
      if (unit) {
        var decoded = UnitsConversion.decodeType(unit.type);
        return UnitsConversion.getPhysicalUnits(decoded.family + '.');
      }
      return null;
    }

    function init() {
      self.qty = self.qty ? self.qty : {};
      self.qty.unit = self.qty.unit ? self.qty.unit : {};
      self.qty.unit.type = self.qty.unit.type ? self.qty.unit.type : self.type;
      self.units = getAllUnits(self.qty.unit);
      self.newValue = self.qty.value;
      self.newUnit = self.qty.unit;
      $scope.$watch('EditorQuantity.newUnit', function(newVal, oldVal) {
        if ((newVal) && (oldVal)) {
          self.newValue = UnitsConversion.fromTo(self.newValue, oldVal.type, newVal.type);
        }
      });
    }

    this.getUnit = function() {
      return self.qty.unit.type;
    };

    this.edit = function() {
      this.editing = true;
      this.newValue = this.qty.value;
      this.newUnit = this.qty.unit;
    };

    this.cancel = function() {
      this.editing=false;
    };

    this._accept = function() {
      this.editing=false;
      this.qty.value = this.newValue;
      this.qty.unit = this.newUnit;
      this.accept({'$value': this.qty});
    };

    init();

  }],
  templateUrl: 'app/shared/editor/quantity/editor-quantity.html'
});
