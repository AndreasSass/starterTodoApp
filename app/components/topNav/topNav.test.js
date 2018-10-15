(function() {
	'use strict';

	describe('TopNav component', function() {
		var $outerScope, $scope, element;

		beforeEach(module('component.topNav'));
		beforeEach(module('/components/topNav/topNav.html'));
		beforeEach(module('/components/topNav/topNav.fixture.html'));

		beforeEach(inject(function($compile, $rootScope, $templateCache) {
			// Get fixture
			var fixture = $templateCache.get('/components/topNav/topNav.fixture.html');
			// Create scope
			$outerScope = $rootScope.$new();
			// Compile scope & fixture into the compiled element
			element = $compile(angular.element(fixture))($outerScope);
			// Init digest, to test before it has been given any data
			$outerScope.$digest();
		}));

		it('should do something', function() {
			// Do outerScope changes, and remember to digest after
			// $outerScope.something = 'test';
			// $outerScope.$digest();

			// Html:
			// element.html();

			// Inner scope
			// var $scope = element.isolateScope();
		});
	});
})();
