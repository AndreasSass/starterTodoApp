(function() {
	'use strict';

	angular
		.module('service.{{name}}', [])
		.service('{{nameUpper}}', function($http, $q) {
			var baseApi = '//localhost:3000/api/...';

			this.get = function () {
				//var apiPath = baseApi + '/';
				var apiPath = '/services/{{name}}/{{name}}.fixture.json';

				return $q(function(resolve, reject) {
					$http({
						method: 'GET',
						url: apiPath
					})
					.then(function(res) {
						resolve(res.data);
					}, function(err) {
						reject(err);
					});
				});
			}
		});
})();
