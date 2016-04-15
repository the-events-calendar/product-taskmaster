var cssnano    = require( 'gulp-cssnano' );
var fs         = require( 'fs' );
var gulp       = require( 'gulp' );
var gutil      = require( 'gulp-util' );
var livereload = require( 'gulp-livereload' );
var rename     = require( 'gulp-rename' );
var uglify     = require( 'gulp-uglify' );
var postcss     = require( 'gulp-postcss' );
var cssnext     = require( 'postcss-cssnext' );
var cssimport   = require( 'postcss-import' );
var cssnested   = require( 'postcss-nested' );
var cssmixins   = require( 'postcss-mixins' );
var cssmqpacker = require( 'css-mqpacker' );

var watch_task = function() {
	'use strict';

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
		  postcss_dir + '/*.css',
		],
		function() {
			var processors = [
				cssimport(),
				cssmixins(),
				cssnested(),
				cssnext(),
				cssmqpacker(),
			];

			gulp.src( [
				'./src/resources/postcss/**/*.css',
				'!./src/resources/postcss/**/_*.css',
			] )
				.pipe( postcss( processors ) )
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
		gutil.log( gutil.colors.yellow( 'File changed (' + file.path + ')' ) );
	} );
};

gulp.task( 'watch', watch_task );
module.exports = watch_task;
