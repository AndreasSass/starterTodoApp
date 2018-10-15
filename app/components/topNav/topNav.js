(function() {
	'use strict';

	var modules = [];

	var topNav = {
		templateUrl: '/components/topNav/topNav.html',
		controller: /*@ngInject*/topNavController,
		bindings: {
			content: '<'
		}
	};

	function topNavController() {
		var ctrl = this;

		// Bind stuff
	}

	angular
		.module('component.topNav', modules)
		.component('topNav', topNav);
})();
