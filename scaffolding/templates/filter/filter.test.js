(function() {
	'use strict';

	describe('{{nameUpper}} filter', function () {
		var $filter;

		beforeEach(module('filter.{{name}}'));
		beforeEach(inject(function(_$filter_) {
			$filter = _$filter_;
		}));

		it('should do something', function() {
			// Some test
		});
	});
})();
