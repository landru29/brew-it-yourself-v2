describe('Ingredient service', function () {
    var Ingredient;

    var fixture = readJSON('src/app/shared/ingredient/ingredient.fixture.json');

    beforeEach(module('brewItYourself'));

    beforeEach(inject(function (_Ingredient_) {
        Ingredient = _Ingredient_;
    }));

    it('Load ingredients', function () {
      _.forEach(fixture, function(data, type) {
        var ingredient = new Ingredient(fixture[type]);
          expect(ingredient.type).toEqual(type);
      });
    });
});
