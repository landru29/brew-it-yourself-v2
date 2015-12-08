describe('Recipe service', function () {
    var Recipe;
    var recipe;

    var fixture = readJSON('src/app/shared/recipe/recipe.fixture.json');

    beforeEach(module('brewItYourself'));

    beforeEach(inject(function (_Recipe_) {
        Recipe = _Recipe_;
        recipe = new Recipe(fixture);
    }));

    it('Should load Recipe', function () {
      expect(recipe.name).toEqual(fixture.name);
      expect(recipe.steps.length).toEqual(fixture.steps.length);
    });

    it('#getTime', function () {
      var lastStep = _.last(recipe.steps);
      var duringTime = recipe.getTime(recipe.steps[0], lastStep);
      expect(duringTime).toEqual(185);
    });

    it('#getIngredients', function () {
      var water = recipe.getIngredients({type: 'water'});
      expect(water.length).toEqual(2);
      var malt = recipe.getIngredients({type: 'fermentable'});
      expect(malt.length).toEqual(3);
    });

    it('#getFermentableMass', function () {
      var malts = recipe.getFermentableMass();
      expect(malts.length).toEqual(3);
      malts.forEach(function(malt) {
        expect(malt.mass).toBeDefined();
        expect(malt.yield).toBeDefined();
        expect(malt.color).toBeDefined();
      });
    });

    it('#getHops', function () {
      var hops = recipe.getHops();
      expect(hops.length).toEqual(2);
      hops.forEach(function(hop) {
        expect(hop.mass).toBeDefined();
        expect(hop.alpha).toBeDefined();
        expect(hop.lasting).toBeDefined();
      });
    });

    it('#getLiquidVolume', function () {
      var liquid = recipe.getLiquidVolume();
      expect(liquid).toEqual(50);
    });

    it('#liquidRetention', function () {
      var liquid = recipe.liquidRetention();
      expect(liquid).toEqual(8.2);
    });

    it('#boilingLiquidLost', function () {
      var liquid = recipe.boilingLiquidLost();
      expect(liquid).toEqual(1.254);
    });

    it('#estimateColor', function () {
      var color = recipe.estimateColor();
      expect(Math.round(color.srm*1000)).toEqual(7187);
    });

    it('#mashingVolume', function () {
      var liquid = recipe.mashingVolume();
      expect(Math.round(liquid*10)).toEqual(246);
    });

    it('#sugarMassEstimation', function () {
      var sugar = recipe.sugarMassEstimation();
      expect(Math.round(sugar*10)).toEqual(60);
    });

    it('#gravity', function () {
      var sg = recipe.gravity();
      expect(Math.round(sg*1000)).toEqual(1049);
    });

    it('#getAlcohol', function () {
      var alcohol = recipe.getAlcohol();
      expect(Math.round(alcohol*1000)).toEqual(45);
    });

    it('#ibuEstimation', function () {
      var ibu = recipe.ibuEstimation();
      expect(Math.round(ibu*10)).toEqual(203);
    });



});
