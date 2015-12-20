angular.module('brewItYourself').component('editorAroma',
{
  bindings: {
    model: '=',
    accept: "&"
  },
  controllerAs: 'EditorAroma',
  controller: function() {
    'use strict';

    this.edit = function() {
      this.editing = true;
      this.editingModel = JSON.parse(JSON.stringify(this.model));
    };

    this.cancel = function() {
      this.editing=false;
    };

    this._accept = function() {
      this.editing=false;
      this.model = JSON.parse(JSON.stringify(this.editingModel));
      this.accept({'$value': this.model});
    };
  },
  templateUrl: 'app/shared/editor/aroma/editor-aroma.html'
});
