(function() {
	'use strict';

	describe('Ls factory', function () {
		var factory;

		beforeEach(module('factory.ls'));
		beforeEach(inject(function(Ls) {
			factory = Ls;
		}));

		describe('#getObject', function() {
			it('Should define the getObject method', function() {
				expect(factory.getObject).to.not.be.undefined;
				expect(factory).to.respondTo('getObject');
			});
		});
	});
})();
