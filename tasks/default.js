module.exports = function( gulp, pkg ) {
	'use strict';

	var task = gulp.series(
		'postcss',
		gulp.parallel(
			'compress-css',
			'compress-js',
		),
	);

	gulp.task( 'default', task );
};
