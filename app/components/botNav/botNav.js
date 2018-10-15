(function() {
	'use strict';

	var modules = [];

	var botNav = {
		templateUrl: '/components/botNav/botNav.html',
		controller: /*@ngInject*/botNavController,
		bindings: {
			content: '<'
		}
	};

	function botNavController($rootScope) {
		var ctrl = this;

		ctrl.$onInit = function() {}

		ctrl.navigationToggle = ($event) => {
			$event.stopPropagation();

			$rootScope.navigationToggle = !$rootScope.navigationToggle;
		}
	}

	angular
		.module('component.botNav', modules)
		.component('botNav', botNav);
})();
