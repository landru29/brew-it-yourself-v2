angular.module('brewItYourself').component('editorLasting',
    {
        bindings: {
            model: '=',
            accept: "&"
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
    });