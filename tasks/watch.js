var cssnano    = require( 'gulp-cssnano' );
var gulp       = require( 'gulp' );
var gutil      = require( 'gulp-util' );
var livereload = require( 'gulp-livereload' );
var rename     = require( 'gulp-rename' );
var uglify     = require( 'gulp-uglify' );

var watch_task = function() {
	'use strict';

	livereload.listen();

	// watch for changes to non .min JS files and compress them
	gulp.watch(
		[
		  'src/resources/js/*.js',
			'!src/resources/js/*.min.js'
		],
		function( file ) {
		  gulp.src( file.path )
			  .pipe( uglify() )
				.pipe(
				  rename( {
					  extname: '.min.js'
					} )
				)
				.pipe( gulp.dest( 'src/resources/js' ) );
		}
	);

	// watch for changes to non .min CSS files and compress them
	gulp.watch(
		[
		  'src/resources/css/*.css',
			'!src/resources/css/*.min.css'
		],
		function( file ) {
		  gulp.src( file.path )
			  .pipe( cssnano() )
				.pipe(
				  rename( {
					  extname: '.min.css'
					} )
				)
				.pipe( gulp.dest( 'src/resources/css' ) );
		}
	);

	// watch for changes to JS and CSS and let livereload know about those changes
	gulp.watch( [
	  'src/resources/js/*.js',
	  'src/resources/css/*.css'
	] ).on( 'change', function( file ) {
		livereload.changed( file.path );
		gutil.log( gutil.colors.yellow( 'File changed (' + file.path + ')' ) );
	} );
};

gulp.task( 'watch', watch_task );
module.exports = watch_task;
