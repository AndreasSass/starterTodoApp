(function() {
	'use strict';

	var modules = [];

	var {{name}} = {
		templateUrl: '/components/{{name}}/{{name}}.html',
		controller: /*@ngInject*/{{name}}Controller,
		bindings: {
			content: '<'
		}
	};

	function {{name}}Controller() {
		var ctrl = this;

		// Bind stuff
	}

	angular
		.module('component.{{name}}', modules)
		.component('{{name}}', {{name}});
})();
