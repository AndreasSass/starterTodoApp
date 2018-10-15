// Include main scripts
var gulp = require('gulp');
var argv = require('yargs').argv;
var livereload = require('gulp-livereload');

// Prep configuration
var config = require('./gulp/_config');
var bumpType = [argv.bump] || ['build'];
var port = argv.p || 8000;

// If your not using s3 set this to false to improve build speed
var useS3 = false;

/**
 *	Include gulp tasks
 */

/**
 *  Copy assets and html
 *
 *  Tasks:
 *    - html
 *    - html--deploy
 *    - clean-html-tmp
 *    - clean-dist
 *    - assets
 *    - images
 */
require('./gulp/copy')(gulp, livereload);

/**
 *  Compile sass
 *
 *  Tasks:
 *    - sass
 *    - sass-lint
 */
require('./gulp/sass')(gulp, livereload);

/**
 *  Compile js libs
 *
 *  Tasks:
 *    - libs
 */
require('./gulp/libs')(gulp, livereload);

/**
 *  Compile js scripts
 *
 *  Tasks:
 *    - scripts
 *    - scripts-lint
 *    - build-docs
 *	    - clean-docs
 *	    - script-docs
 */
require('./gulp/scripts')(gulp, livereload);

/**
 *  File revision for cache busting
 *
 *  Tasks:
 *    - rev
 *    - rev-replace
 */
require('./gulp/revReplace')(gulp, useS3);

/**
 *  Copy to S3
 *
 *  Tasks:
 *    - copyToS3
 */
require('./gulp/cdn-s3')(gulp, useS3);

/**
 *	Build sprites
 *
 *	Tasks:
 *	  - sprites
 */
require('./gulp/sprites')(gulp, livereload);

/**
 *  Setup primary tasks
 */

// Default build
gulp.task('build',
	gulp.series('clean-dist',
		gulp.parallel(
			'sass-lint',
			'sass',
			'libs',
			'script-lint',
			'scripts',
			'html',
			'html-create-hash-js',
			'hash-html-wrap',
			'images',
			'assets',
			'fixtures'
		),
		'combine-scripts',
		'generate-service-worker'
	)
);

// Build for deployment
//gulp.task('deploy', gulp.series('clean-dist', 'html', gulp.parallel('sass', 'libs', 'scripts', 'images', 'assets', 'fixtures'), 'html--deploy', 'clean-html-tmp', 'rev', 'rev-replace', 'copyToS3'));

// Watch files for changes and run tasks
gulp.task('default', gulp.series('build', function () {
	livereload.listen({
		port: 35725
	});

	var watchScripts = config.scripts;

	watchScripts.unshift('app/envs/**/*.js');

	gulp.watch(config.libs, gulp.series('libs', 'combine-scripts'));
	gulp.watch(config.images, gulp.parallel('images'));
	gulp.watch(config.assets, gulp.parallel('assets'));
	gulp.watch(config.svgSprite, gulp.parallel('sprites'));
	gulp.watch(config.fixtures, gulp.parallel('fixtures'));
	gulp.watch('app/**/*.scss', gulp.parallel('sass', 'sass-lint'));
	gulp.watch(config.html, gulp.series(gulp.parallel('html', 'clean-html-tmp', 'html-create-hash-js'), 'combine-scripts'));
	gulp.watch(watchScripts, gulp.series(gulp.parallel('scripts', 'script-lint'), 'combine-scripts'));
}));
