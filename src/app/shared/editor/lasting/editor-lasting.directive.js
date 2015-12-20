angular.module('brewItYourself').directive('editorLasting', function(){
  return {
    scope: {
        model: '=',
        accept: '&'
    },
    bindToController: true,
    restrict: 'E',
    link: function(scope, element, attrs) {

      var pinH = element.find('line.pinH');
      var pinHCircle = element.find('circle.pinH');
      var pinM = element.find('line.pinM');


      function polar(coord) {
        return {
          alpha: Math.atan(coord.y / coord.x) * 180 / Math.PI + (coord.x>=0 ? 90 : 270),
          ray: Math.sqrt(coord.x*coord.x + coord.y*coord.y)
        };
      }

      function cartesian(coord){
        return {
          x: coord.ray * Math.sin(coord.alpha * Math.PI / 180),
          y: -coord.ray * Math.cos(coord.alpha * Math.PI / 180)
        };
      }

      function adaptCoord(x, y) {
        var cart = {
          x: event.offsetX - 100,
          y: event.offsetY - 100
        };
        return angular.extend(cart, polar(cart));
      }

      scope.$watch('EditorLasting.newLasting', function(newVal, oldVal) {
        if (!newVal) {
          return;
        }
        var centerHR = (newVal.hours < 13) && (newVal.hours>0) ? 60 : 80;
        var alphaH = newVal.hours * 30;
        var pinHCoord = cartesian({
          ray:centerHR-12,
          alpha: alphaH
        });
        var pinMCoord = cartesian({
          ray:55,
          alpha: newVal.minutes * 6
        });
        var circleHCoord = cartesian({
          ray:centerHR,
          alpha: alphaH
        });
        pinHCircle.attr('cx', circleHCoord.x);
        pinHCircle.attr('cy', circleHCoord.y-4);
        pinH.attr('x2', pinHCoord.x);
        pinH.attr('y2', pinHCoord.y - 4);
        pinM.attr('x2', pinMCoord.x);
        pinM.attr('y2', pinMCoord.y - 4);
      }, true);

      element.find('.clockH').bind('click', function(event) {
        var coord = adaptCoord(event.offsetX, event.offsetY);
        if (coord.ray<72) {
          scope.EditorLasting.newLasting.hours = Math.round(coord.alpha-15 >0 ? coord.alpha / 30 : 12);
        } else {
          scope.EditorLasting.newLasting.hours = Math.round(coord.alpha-15 >0 ? 12 + coord.alpha / 30 : 0);
        }
        scope.$digest();
      });

      element.find('.clockM').bind('click', function(event) {
        var coord = adaptCoord(event.offsetX, event.offsetY);
        scope.EditorLasting.newLasting.minutes = Math.round(coord.alpha / 6);
        scope.$digest();
      });

    },
    controllerAs: 'EditorLasting',
    controller: function() {
        'use strict';

        function getTime(minutes) {
          return {
            minutes: minutes % 60,
            hours: Math.floor(minutes / 60) % 24,
            days: Math.floor(minutes / 1440)
          };
        }

        function setTime(time) {
          return time.minutes + time.hours * 60 + time.days * 60 * 24;
        }

        this.edit = function() {
            this.hours = true;
            this.editing = true;
            this.newLasting = getTime(this.model);
        };

        this.cancel = function() {
            this.editing=false;
        };

        this._accept = function() {
            this.editing=false;
            this.model = setTime(this.newLasting);
            this.accept({'$value': this.model});
        };
    },
    templateUrl: 'app/shared/editor/lasting/editor-lasting.html'
  };
});
