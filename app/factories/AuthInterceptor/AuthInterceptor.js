(function() {
	'use strict';

	angular
		.module('factory.AuthInterceptor', [])
		.factory('AuthInterceptor', AuthInterceptor);

	function AuthInterceptor($injector, Ls) {
		var invalid = false;

		return {
			request: function(config) {
				var token = Ls.getOne('token');

				if (!_.isUndefined(token) && !_.isNull(token) && token.length > 0) {
					config.headers['x-access-token'] = token;
				}

				return config;
			},
			response: function(config) {
				//if (config && config.code === 'token_invalid') {
				// Remove all user data and tokens
				Ls.clear();

				// Go to login page
				$injector.get('$state').go('login');
				// } else {
				// 	// If token is expired try to update it
				// 	if (config && config.code === 'token_expired') {
				// 		$injector.get('Auth').refreshToken(true, true)
				// 			.then(function() {
				// 				$injector.get('$timeout')(function() {
				// 					$injector.get('$state').reload();
				// 				}, 0, true);
				// 			})
				// 			.catch(function() {
				// 				invalid = true;
				// 			});
				// 	}
				// }

				return config;
			}
		};
	}
})();
