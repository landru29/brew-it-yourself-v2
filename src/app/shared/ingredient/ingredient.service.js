/**
 * @ngdoc service
 * @name brewItYourself.Ingredient
 * @module brewItYourself
 * @description
 *  Step model
 */
angular.module('brewItYourself').service('Ingredient', function(uuid) {

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
        _uuid: uuid.new()
      },
      data
    );
    Object.keys(ingredientData).forEach(function(key) {
      switch (key) {
        case 'yield':
        case 'color':
        case 'alpha':
            self[key] = parseFloat(ingredientData[key]);
            break;
        default:
           self[key] = ingredientData[key];
      }

    });
  };

  return Ingredient;
});
