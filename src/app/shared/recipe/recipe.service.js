/**
 * @ngdoc service
 * @name brewItYourself.Recipe
 * @module brewItYourself
 * @description
 *  Recipe model
 */
angular.module('brewItYourself').service('Recipe', function(Step, Ingredient, UnitsConversion, BeerColor, BeerSugar, Ibu, BREWING) {

  function generateLocalUUID() {
    return new Date().getTime().toString(16).toUpperCase();
  }

  /**
   * @ngdoc method
   * @constructor
   * @name Recipe
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Constructor for a Recipe
   * @param {Object} data JSON data to preload the recipe
   */
  var Recipe = function(data) {
    var self = this;
    var recipeData = angular.extend({
        name: '',
        date: new Date(),
        author: '',
        uuid: generateLocalUUID(),
        steps: []
      },
      data
    );

    Object.keys(recipeData).forEach(function(key) {
      var property = recipeData[key];
      switch (key) {
        case 'steps':
          self.steps = property.map(function(stepData) {
            return new Step(stepData);
          });
          break;
        default:
          self[key] = property;
      }
    });
  };

  /**
   * @ngdoc method
   * @name getTime
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Return the time between two steps (included)
   * @param   {Step} stepStart Starting step
   * @param   {Step} stepEnd   Ending step / not required
   * @returns {Float} time in minutes
   */
  Recipe.prototype.getTime = function(stepStart, stepEnd) {
    var indexStart = this.steps.indexOf(stepStart);
    var indexEnd = (stepEnd ? this.steps.indexOf(stepEnd) : this.steps.length - 1);
    var result = 0;
    if (indexStart > -1) {
      for (var i = indexStart; i <= indexEnd; i++) {
        result += this.steps[i].getMinutes();
      }
    }
    return result;
  };

  /**
   * @ngdoc method
   * @name getIngredients
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Get all the ingredients of the recipe
   * @param   {Object} filter Filter
   * @returns {[Ingredient]} array of ingredients, the ingredients will be overloaded with the step
   */
  Recipe.prototype.getIngredients = function(filter) {
    return [
      []
    ].concat(this.steps).reduce(function(ingredients, next) {
      return ingredients.concat(next.getIngredients(filter));
    });
  };

  /**
   * @ngdoc method
   * @name getFermentableMass
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Get all informations about the fermentables (=malts) in the recipe)
   * @returns {Object} array of fermentable descriptions ({mass, yield, color}); mass are in kg
   */
  Recipe.prototype.getFermentableMass = function() {
    var fermentable = this.getIngredients({
      type: 'fermentable'
    });
    return fermentable.map(function(ingredient) {
      var qty = ingredient.qty ? ingredient.qty : {
        value: 0,
        unit: {
          type: 'mass.kg'
        }
      };
      return {
        mass: UnitsConversion.fromTo(qty.value, qty.unit.type, 'kg'),
        yield: ingredient.yield,
        color: ingredient.color
      };
    });
  };

  /**
   * @ngdoc method
   * @name getHops
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Get all information about hops
   * @returns {Object} array of hops ({mass, alpha, lasting}); mass are in grams, lastings are in minutes
   */
  Recipe.prototype.getHops = function() {
    var hops = this.getIngredients({
      type: 'hop'
    });
    var result = [];
    if (hops.length > 0) {
      var lastHoppingStep = hops[hops.length - 1].step;
      hops.forEach(function(hop) {
        var qty = hop.qty;
        if (qty) {
          result.push({
            mass: unitsConversion.fromTo(qty.value, qty.unit.type, 'g'),
            alpha: hop.alpha,
            lasting: this.getTime(hop.step, lastHoppingStep)
          });
        }
      });
    }
    return result;
  };


  /**
   * @ngdoc method
   * @name getLiquidVolume
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Get the volume of water in the recipe
   * @returns {Integer} volume in liter
   */
  Recipe.prototype.getLiquidVolume = function() {
    var water = this.getIngredients({
      type: 'water'
    });
    return [0].concat(water).reduce(function(total, next) {
      var qty = water[index].qty;
      return total + qty ? UnitsConversion.fromTo(qty.value, qty.unit.type, 'l') : 0;
    });
  };

  /**
   * @ngdoc method
   * @name stringify
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Convert this object in a JSON string
   * @returns {String} JSON representation of the object. all fields which name begin with '$' will be ignored
   */
  Recipe.prototype.stringify = function() {
    var cleanObject = function(obj) {
      for (var i in obj) {
        if (i[0] === '$') {
          delete obj[i];
        } else if ('object' === typeof obj[i]) {
          cleanObject(obj[i]);
        }
      }
      return obj;
    };
    var clonedObject = cleanObject(JSON.parse(JSON.stringify(this)));
    return JSON.stringify(clonedObject);
  };

  /**
   * @ngdoc method
   * @name clone
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Clone a recipe
   * @returns {Recipe} cloned recipe
   */
  Recipe.prototype.clone = function() {
    var cloned = new Recipe(JSON.parse(this.stringify()));
    cloned.uuid = generateLocalUUID();
    return cloned;
  };


  /**
   * @ngdoc method
   * @name estimateColor
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Estimate the color of the beer
   * @returns {Object} color of the beer ({srm, rgb})
   */
  Recipe.prototype.estimateColor = function() {
    return BeerColor.estimateColor(this.getLiquidVolume(), this.getFermentableMass());
  };

  /**
   * @ngdoc method
   * @name liquidRetention
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Compute the liquid retention in the grain
   * @returns {Float} volume, in liter of the liquid in the grain (lost)
   */
  Recipe.prototype.liquidRetention = function() {
    var grain = this.getFermentableMass();
    var grainMass = [0].concat(this.getFermentableMass()).reduce(function(total, next) {
      return total + next.mass;
    });
    return grainMass * BREWING.waterRetentionRate / 100;
  };

  /**
   * @ngdoc method
   * @name boilingLiquidLost
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Compute the liquid volume at the end of the process
   * @returns {Float} final volume, in liter of the liquid
   */
  Recipe.prototype.boilingLiquidLost = function() {
    return (this.getLiquidVolume() - this.liquidRetention()) * (BREWING.boilingLostRate) / 100;
  };

  /**
   * @ngdoc method
   * @name mashingVolume
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Compute the recommended volume of water for mashing
   * @returns {Float} volume of water in liter
   */
  Recipe.prototype.mashingVolume = function() {
    var grain = this.getFermentableMass();
    return [0].concat(grain).reduce(function(total, next) {
      return total + next.mass * BREWING.mashingWaterRate / 100;
    });
  };

  /**
   * @ngdoc method
   * @name sugarMassEstimation
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Estimate the mass of sugar extracted from the malts
   * @returns {Float} mass of sugar in kg
   */
  Recipe.prototype.sugarMassEstimation = function() {
    return BeerSugar.producedSugar(this.getFermentableMass(), BREWING.globalGrainYield / 100);
  };

  /**
   * @ngdoc method
   * @name gravity
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Estimate the gravity before fermentation
   * @returns {Float} gravity in sg
   */
  Recipe.prototype.gravity = function() {
    var liquidVol = this.getLiquidVolume() - this.boilingLiquidLost();
    var sugarMass = this.sugarMassEstimation();
    if (!liquidVol) {
      return 1.0;
    }
    var gPerLiter = 1000 * sugarMass / liquidVol;
    return unitsConversion.fromTo(gPerLiter, 'sugar.gPerLiter', 'sg');
  };

  /**
   * @ngdoc method
   * @name ibuEstimation
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Compute the IBU of the beer
   * @returns {Float} IBU
   */
  Recipe.prototype.ibuEstimation = function() {
    var self = this;
    var alphaAcidity;
    var hops = this.getHops();
    var gravity = this.gravity();
    var volume = this.getLiquidVolume();
    hops.forEach(function(hop) {
      hop.gravitySg = gravity;
      volumeL = volume;
    });
    return Ibu.compute(BREWING.ibuComputeCurrentMethod, hops);
  };

  /**
   * @ngdoc method
   * @name getAlcohol
   * @methodOf brewItYourself.Recipe
   * @module brewItYourself
   * @description
   * Estimate the alcohol in the beer (based on the residual gravity specified in the properties
   * @returns {Float} alcohol rate per volume (ie. returning 0.052 means 5.2%Vol)
   */
  Recipe.prototype.getAlcohol = function() {
    var initialGravity = this.gravity();
    return (initialGravity > BREWING.residualGravity ? unitsConversionProvider.fromTo(1 + initialGravity - BREWING.residualGravity, 'sugar.sg', 'alcohol') : 0);
  };

  return Recipe;
});
