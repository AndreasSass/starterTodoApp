// External modules
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var swPrecache = require('sw-precache');
var concat = require('gulp-concat');
var hashsum = require('gulp-hashsum');

// Import config
var config = require('./_config');

var env = process.env.NODE_ENV || 'local';
var live = env === 'prod' || env === 'stag';

// Html module
module.exports = function(gulp, livereload) {
	// Add envs var
	if (process.env.FAKE_ENV) {
		env = process.env.FAKE_ENV;
	}

	gulp.task('html', function() {
		return gulp.src(config.html)
			.pipe(gulp.dest('dist'))
			.pipe(livereload());
	});

	gulp.task('html-create-hash-js', function() {
		return gulp.src(config.html)
			// .pipe(templateCache('app-templates.js', {
			// 	standalone: true
			// }))
			.pipe(concat('html-concat.html'))
			.pipe(hashsum({
				dest: './dist',
				filename: 'cache-html.js',
				json: true
			}))
			.pipe(gulp.dest('dist'))
			.pipe(livereload());
	});

	gulp.task('hash-html-wrap', function() {
		return gulp.src(config.templateCache)
			.pipe(gulp.dest('dist'))
			.pipe(livereload());
	})

	gulp.task('html--min', function() {
		return gulp.src(config.html)
			.pipe(htmlmin())
			.pipe(gulp.dest('dist'));
	});

	gulp.task('images', function() {
		return gulp.src(config.images)
			.pipe(gulp.dest('dist/images'))
			.pipe(livereload());
	});

	gulp.task('service-worker', function() {
		return gulp.src([
				'app/sw.js'
			])
			.pipe(gulp.dest('dist'))
			.pipe(livereload());
	});

	var localAndDev = [{
		urlPattern: /^http:\/\/localhost:3000\/api\/(.*)/,
		handler: 'networkFirst'
	}, {
		urlPattern: /^https:\/\/dev-api\.introdus\.dk\/api\/(.*)/,
		handler: 'networkFirst'
	}]

	var envs = {
		local: localAndDev,
		dev: localAndDev,
		stag: [{
			urlPattern: /^https:\/\/staging-api\.introdus\.dk\/api\/(.*)/,
			handler: 'networkFirst'
		}],
		prod: [{
			urlPattern: /^https:\/\/api\.introdus\.dk\/api\/(.*)/,
			handler: 'networkFirst'
		}]
	}

	gulp.task('generate-service-worker', function(cb) {
		swPrecache.write('dist/service-worker.js', {
			staticFileGlobs: config.sw,
			navigateFallback: '/index.html',
			runtimeCaching: envs[env],
			handleFetch: env !== 'dev' && env !== 'local',
			stripPrefix: 'dist'
		}, cb);
	});

	gulp.task('assets', function() {
		return gulp.src(config.assets)
			.pipe(gulp.dest('dist/assets'))
			.pipe(livereload());
	});

	gulp.task('fixtures', function() {
		return gulp.src(config.fixtures)
			.pipe(gulp.dest('dist'))
			.pipe(livereload());
	});

	gulp.task('clean-html-tmp', function () {
		return del(['dist/tmp-**']);
	});

	gulp.task('clean-dist', function () {
		return del(['dist/**']);
	});
};
