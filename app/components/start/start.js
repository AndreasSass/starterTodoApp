(function() {
	'use strict';

	var modules = [];

	var start = {
		templateUrl: '/components/start/start.html',
		controller: /*@ngInject*/startController,
		bindings: {
			content: '<'
		}
	};

	function startController() {
		var ctrl = this;

		// Bind stuff
	}

	angular
		.module('component.start', modules)
		.component('start', start);
})();
