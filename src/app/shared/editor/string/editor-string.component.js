angular.module('brewItYourself').component('editorString',
{
  bindings: {
    model: '=',
    type: '@',
    accept: "&"
  },
  controllerAs: 'EditorString',
  controller: function($scope) {

    this.type = this.type ? this.type : 'string';

    this.edit = function() {
      this.editing = true;
      this.newString = this.model;
    };

    this.cancel = function() {
      this.editing=false;
    };

    this._accept = function() {
      this.editing=false;
      this.model = this.newString;
      this.accept({'$value': this.model});
    };
  },
  templateUrl: 'app/shared/editor/string/editor-string.html'
});
