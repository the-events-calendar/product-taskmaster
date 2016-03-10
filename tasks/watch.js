var gulp   = require( 'gulp' );

var watch_task = function() {
	'use strict';

	livereload.listen();

	gulp.watch( 'src/resources/js/*.js', [ 'compress-js' ] ).on( 'change', function( file ) {
		livereload.changed( file.path );
		gutil.log( gutil.colors.yellow( 'JS changed (' + file.path + ')' ) );
	} );

	gulp.watch( 'src/resources/css/*.css', [ 'compress-css' ] ).on( 'change', function( file ) {
		livereload.changed( file.path );
		gutil.log( gutil.colors.yellow( 'CSS changed (' + file.path + ')' ) );
	} );
};

gulp.task( 'watch', watch_task );
module.exports = watch_task;
