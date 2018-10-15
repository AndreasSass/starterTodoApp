module.exports = {
	output: 'dist/*',
	cssLibs: [],
	sass: [
		'app/app.scss'
	],
	html: [
		//'app/index.html',
		'app/**/*.html'
	],
	images: [
		'app/images/**/*.{jpg,gif,png,svg,ico}'
	],
	assets: [
		'app/assets/**/*'
	],
	fixtures: [
		'app/**/*.json'
	],
	purify: [
		'app/**/*.{html,js}'
	],
	svgSprite: [
		'app/images/svg/*.svg'
	],
	templateCache: [
		'app/string-wrap.js'
	],
	sassSkip: [
		'!app/sass/core/_layout.scss',
		'!app/sass/mixins/_breakpoint.scss',
		'!app/sass/mixins/_videoFullScreen.scss',
		'!app/sass/mixins/_overflow-scrolling.scss'
	],
	scripts: [
		'app/app.js',
		'app/utils/**/*.js',
		'app/services/**/*.js',
		'app/filters/**/*.js',
		'app/components/**/*.js',
		'app/factories/**/*.js',
		'app/constants/**/*.js'
	],
	scriptsSkip: [
		'!app/**/*.test.js',
		'!app/**/*.mock.js'
	],
	scriptsLint: [
		'app/utils/**/*.js',
		'app/constants/**/*.js',
		'app/services/**/*.js',
		'app/factories/**/*.js',
		'app/filters/**/*.js',
		'app/directives/**/*.js',
		'app/components/**/*.js',
		'app/app.js',
		'!app/utils/lazyloadcss.js'
	],
	libs: [
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.js',
		'node_modules/angular-aria/angular-aria.js',
		'node_modules/@uirouter/core/_bundles/ui-router-core.min.js',
		'node_modules/@uirouter/angularjs/release/ui-router-angularjs.min.js'
	],
	docLibs: [
		'node_modules/angular-animate/angular-animate.js',
		'node_modules/marked/lib/marked.js'
	],
	testLibs: [
		'node_modules/angular/angular.min.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'node_modules/babel-polyfill/dist/polyfill.min.js'
	]
};
