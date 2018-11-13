module.exports = function( gulp ) {
	'use strict';

	var run = require( 'gulp-run-command' );

	gulp.task( 'webpack', run.default( 'npm run build:webpack' ) );
};