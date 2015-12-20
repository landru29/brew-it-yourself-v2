angular.module('brewItYourself').component('editorFermentable',
{
  bindings: {
    model: '=',
    accept: "&"
  },
  isolate: true,
  controllerAs: 'EditorFermentable',
  controller: function(UnitsConversion) {
    'use strict';

    this.edit = function() {
      this.editing = true;
      this.editingModel = JSON.parse(JSON.stringify(this.model));
    };

    this.cancel = function() {
      this.editing=false;
    };

    this.getRgb = function(color) {
      return UnitsConversion.fromTo(color, 'color.ebc', 'color.rgb');
    };

    this._accept = function() {
      this.editing=false;
      this.model = JSON.parse(JSON.stringify(this.editingModel));
      this.accept({'$value': this.model});
    };
  },
  templateUrl: 'app/shared/editor/fermentable/editor-fermentable.html'
});
