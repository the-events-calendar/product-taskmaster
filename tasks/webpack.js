module.exports = function( gulp ) {
	const run = require( 'gulp-run-command' );

	gulp.task( 'webpack',
		run.default( [ 'yarn run build:common', 'yarn run build:webpack' ], { ignoreErrors: true } )
	);
};
