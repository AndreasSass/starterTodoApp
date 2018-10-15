(function() {
	// No strict because of babel.js

	var modules = [
		// Third party
		'ui.router',

		// Components
		'component.navigation',
		'component.start',
		'component.topNav',
		'component.botNav',
		'component.login',

		// Factories
		'factory.AuthInterceptor',
		'factory.ls'
	];

	angular
		.module('app', modules)
		.config(Config)
		.run(Runfig);

	// Config app
	function Config($locationProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
		$locationProvider.html5Mode(true);

		$httpProvider.interceptors.push('AuthInterceptor');

		$stateProvider
			.state('start', {
				url: '/',
				component: 'start'
			});

		$stateProvider
			.state('login', {
				url: '/login',
				component: 'login'
			});

		$urlRouterProvider
			.otherwise('/');
	}

	// Config init load
	function Runfig($rootScope) {
		$rootScope = {
			navigationToggle: false
		};
	}
})();
