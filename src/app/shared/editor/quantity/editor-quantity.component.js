angular.module('brewItYourself').component('editorQuantity',
{
  bindings: {
    model: '=',
    type: '@'
  },
  controllerAs: 'EditorQuantity',
  controller: function($scope) {

    function getType(unit) {
      if (unit) {
        var matcher = (unit.type ? unit.type : '').match(/(([\w-]*)\.)?(.*)/);
        if (matcher) {
          return matcher[1];
        }
        return null;
      }
      return null;
    }

    this.type = this.type ? this.type : getType(this.model ? this.model.unit : null);

    this.unit = this.model.unit ? this.model.unit : {};

    this.getUnit = function() {
      return this.unit.type;
    };
  },
  templateUrl: 'app/shared/editor/quantity/editor-quantity.html'
});
