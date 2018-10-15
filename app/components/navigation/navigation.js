(function() {
	'use strict';

	var modules = [];

	var navigation = {
		templateUrl: '/components/navigation/navigation.html',
		controller: /*@ngInject*/navigationController,
		bindings: {
			content: '<'
		}
	};

	function navigationController() {
		var ctrl = this;

		// Bind stuff
	}

	angular
		.module('component.navigation', modules)
		.component('navigation', navigation);
})();
