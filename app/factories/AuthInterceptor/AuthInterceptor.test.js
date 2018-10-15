(function() {
	'use strict';

	describe('AuthInterceptor factory', function () {
		var factory;

		beforeEach(module('factory.AuthInterceptor'));
		beforeEach(inject(function(AuthInterceptor) {
			factory = AuthInterceptor;
		}));

		describe('Method', function() {
			it('Should define method', function() {
				expect(factory.request).to.not.be.undefined;
				expect(factory).to.respondTo('request');
			});
		});
	});
})();
