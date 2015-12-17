angular.module('brewItYourself').directive('editorLasting', function(){
  return {
    scope: {
        model: '=',
        accept: "&"
    },
    bindToController: true,
    restrict: 'E',
    link: function(scope, element, attrs) {

      function polaire(y, x) {
        return {
          alpha: Math.atan(y / x) * 180 / Math.PI + (x>=0 ? 90 : 270),
          ray: Math.sqrt(x*x + y*y)
        };
      }

      element.find('.clock').bind('click', function(event) {
        console.log('click', polaire(event.offsetY - 90, event.offsetX - 90));
      });
    },
    controllerAs: 'EditorLasting',
    controller: function() {
        'use strict';

        this.edit = function() {
            this.editing = true;
            this.newLasting = this.model;
        };

        this.cancel = function() {
            this.editing=false;
        };

        this._accept = function() {
            this.editing=false;
            this.model = this.newLasting;
            this.accept({'$value': this.model});
        };
    },
    templateUrl: 'app/shared/editor/lasting/editor-lasting.html'
  };
});
