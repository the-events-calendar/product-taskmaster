module.exports = function( gulp ) {
	'use-strict';

	var stylelint = require( 'gulp-stylelint' );
	var postcss_dir = './src/resources/postcss'

	var task = function() {
		return gulp.src( postcss_dir + '/**/*.pcss' )
			.pipe( stylelint( {
				fix: false,
				reporters: [
					{ formatter: 'string', console: true },
				],
			} ) )
			.pipe( gulp.dest( postcss_dir ) );
	};

	gulp.task( 'stylelint', task );
};
