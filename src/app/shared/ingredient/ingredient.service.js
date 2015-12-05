/**
 * @ngdoc service
 * @name brewItYourself.Ingredient
 * @module brewItYourself
 * @description
 *  Step model
 */
angular.module('brewItYourself').service('Ingredient', function() {

  /**
   * @ngdoc method
   * @constructor
   * @name Ingredient
   * @methodOf brewItYourself.Ingredient
   * @module brewItYourself
   * @description
   * Constructor for an Ingredient
   * @param {Object} data JSON data to preload the recipe
   */
  var Ingredient = function(data) {
    var self = this;
    var ingredientData = angular.extend({
      },
      data
    );
    Object.keys(ingredientData).forEach(function(key) {
      self[key] = ingredientData[key];
    });
  };

  return Ingredient;
});
