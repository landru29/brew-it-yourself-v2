describe('Step service', function () {
    var Step;

    var fixture = readJSON('src/app/shared/step/step.fixture.json');

    beforeEach(module('brewItYourself'));

    beforeEach(inject(function (_Step_) {
        Step = _Step_;
    }));

    it('Should load Step', function () {

      var step = new Step(fixture);
      expect(step.getMinutes()).toEqual(15);

      var fermentables = step.getIngredients({type:'fermentable'});
      expect(fermentables.length).toEqual(3);

    });
});
