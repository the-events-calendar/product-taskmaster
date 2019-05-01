module.exports = function( gulp ) {
	'use strict';

	var cssnano     = require( 'gulp-cssnano' );
	var fs          = require( 'fs' );
	var c           = require( 'ansi-colors' );
	var livereload  = require( 'gulp-livereload' );
	var log         = require( 'fancy-log' );
	var rename      = require( 'gulp-rename' );
	var uglify      = require( 'gulp-uglify-es' ).default;
	var header      = require( 'gulp-header' );
	var postcss     = require( 'gulp-postcss' );
	var presetEnv   = require( 'postcss-preset-env' );
	var cssimport   = require( 'postcss-import' );
	var cssnested   = require( 'postcss-nested' );
	var cssmixins   = require( 'postcss-mixins' );
	var cssmqpacker = require( 'css-mqpacker' );

	var task = function() {
		livereload.listen();

		var postcss_dir = 'src/resources/postcss';
		var css_dir = 'src/resources/css';
		var js_dir = 'src/resources/js';

		try {
			fs.statSync( css_dir );
		} catch( err ) {
			css_dir = 'resources';
		}

		try {
			fs.statSync( js_dir );
		} catch( err ) {
			js_dir = 'resources';
		}

		// watch for changes to postcss files and compile them
		gulp.watch(
			[
				postcss_dir + '/**/*.pcss',
			],
			function() {
				var processors = [
					cssimport(),
					cssmixins(),
					cssnested(),
					presetEnv(),
					cssmqpacker(),
				];

				var banner = [
					'/**',
					' * This CSS file was auto-generated via PostCSS',
					' *',
					' * Contributors should avoid editing this file, but instead edit the associated',
					' * src/resources/postcss/ file. For more information, check out our engineering',
					' * docs on how we handle CSS in our engineering docs.',
					' *',
					' * @see: http://moderntribe.github.io/products-engineering/css/',
					' */',
					'',
					'',
				].join( '\n' );

				gulp.src( [
					'./src/resources/postcss/**/*.pcss',
					'!./src/resources/postcss/**/_*.pcss',
				] )
				.pipe( postcss( processors ) )
				.pipe( header( banner ) )
				.pipe(
					rename( {
						extname: '.css'
					} )
				)
				.pipe( gulp.dest( './src/resources/css' ) );
			}
		);

		// watch for changes to non .min JS files and compress them
		gulp.watch(
			[
				js_dir + '/*.js',
				'!' + js_dir + '/*.min.js'
			],
			function( file ) {
				gulp.src( file.path )
					.pipe( uglify() )
					.pipe(
						rename( {
							extname: '.min.js'
						} )
					)
					.pipe( gulp.dest( js_dir ) );
			}
		);

		// watch for changes to non .min CSS files and compress them
		gulp.watch(
			[
				css_dir + '/*.css',
				'!' + css_dir + '/*.min.css'
			],
			function( file ) {
				gulp.src( file.path )
					.pipe( cssnano() )
					.pipe(
						rename( {
							extname: '.min.css'
						} )
					)
					.pipe( gulp.dest( css_dir ) );
			}
		);

		// watch for changes to JS and CSS and let livereload know about those changes
		gulp.watch( [
			js_dir + '/*.js',
			css_dir + '/*.css'
		] ).on( 'change', function( file ) {
			livereload.changed( file.path );
			log( c.yellow( 'File changed (' + file.path + ')' ) );
		} );
	};

	gulp.task( 'watch', task );
};
