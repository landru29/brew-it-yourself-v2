angular.module('brewItYourself').component('editorDate',
{
  bindings: {
    model: '=',
    format: '@',
    accept: "&"
  },
  controllerAs: 'EditorDate',
  controller: function() {
    'use strict';

    this.format = this.format ? this.format : 'dd/MM/yyyy';

    this.edit = function() {
      this.editing = true;
      this.newDate = this.model;
    };

    this.cancel = function() {
      this.editing=false;
    };

    this._accept = function() {
      this.editing=false;
      this.model = this.newDate;
      this.accept({'$value': this.model});
    };
  },
  templateUrl: 'app/shared/editor/date/editor-date.html'
});
