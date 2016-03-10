var gulp       = require( 'gulp' );
var livereload = require( 'gulp-livereload' );

var watch_task = function() {
	'use strict';

	livereload.listen();

	gulp.watch(
		[
		  'src/resources/js/*.js',
			'!src/resources/js/*.min.js'
		],
		[ 'compress-js' ]
	);

	gulp.watch(
		[
		  'src/resources/css/*.css',
			'!src/resources/css/*.min.css'
		],
		[ 'compress-css' ]
	);

	gulp.watch( 'src/resources/js/*.js' ).on( 'change', function( file ) {
		livereload.changed( file.path );
		gutil.log( gutil.colors.yellow( 'JS changed (' + file.path + ')' ) );
	} );

	gulp.watch( 'src/resources/css/*.css' ).on( 'change', function( file ) {
		livereload.changed( file.path );
		gutil.log( gutil.colors.yellow( 'CSS changed (' + file.path + ')' ) );
	} );
};

gulp.task( 'watch', watch_task );
module.exports = watch_task;
