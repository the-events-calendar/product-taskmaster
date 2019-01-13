module.exports = function( gulp ) {
	const run = require( 'gulp-run-command' );

	gulp.task( 'webpack',
		run.default( [ 'npm run build:common', 'npm run build:webpack' ], { ignoreErrors: true } )
	);
};
