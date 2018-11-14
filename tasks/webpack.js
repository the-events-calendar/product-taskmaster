module.exports = function( gulp ) {
	const run = require( 'gulp-run-command' );

	try {
		gulp.task( 'webpack', run.default( 'npm run build:common' ) );
	} catch ( error ) {
	}

	gulp.task( 'webpack', run.default( 'npm run build:webpack' ) );
};
