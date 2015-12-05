/**
 * @ngdoc service
 * @name brewItYourself.Step
 * @module brewItYourself
 * @description
 *  Step model
 */
angular.module('brewItYourself').service('Step', function(Ingredient) {

  /**
   * @ngdoc method
   * @constructor
   * @name Step
   * @methodOf brewItYourself.Step
   * @module brewItYourself
   * @description
   * Constructor for a Step
   * @param {Object} data JSON data to preload the recipe
   */
  var Step = function(data) {
    var self = this;
    var stepData = angular.extend({
        name: '',
        lasting: 0,
        temperature: 20,
        ingredients: []
      },
      data
    );
    Object.keys(stepData).forEach(function(key) {
      var property = stepData[key];
      switch (key) {
        case 'ingredients':
          self.ingredient = property.map(function(ingredientData) {
            return new Ingredient(ingredientData);
          });
          break;
        case 'lasting':
          if (Object.prototype.toString.call(property) === '[object Object]') {
            self.lasting = property.minutes + property.hours * 60 + property.days * 60 * 24;
          } else {
            self.lasting = property;
          }
          break;
        default:
          self[key] = property;
      }
    });
  };

  /**
   * @ngdoc method
   * @name getMinutes
   * @methodOf brewItYourself.Step
   * @module brewItYourself
   * @description
   * Get the lasting of the step in minutes
   * @returns {Float} lasting of the step in minutes
   */
  Step.prototype.getMinutes = function() {
    return this.lasting;
  };

  /**
   * @ngdoc method
   * @name getIngredients
   * @methodOf brewItYourself.Step
   * @module brewItYourself
   * @description
   * Get all the ingredients of the recipe
   * @param   {Object} filter Filter
   * @returns {Array} array of ingredients, the ingredients will be overloaded with the step
   */
  Step.prototype.getIngredients = function(filter) {
    var self = this;
    var result = [];
    return _.filter(this.ingredients, filter).map(function(ingredientData) {
      var ingredient = new Ingredient(ingredientData);
      ingredient.step = self;
      return ingredient;
    });
  };


  return Step;
});
