module.exports = function( gulp, pkg ) {
	'use strict';

	var task = gulp.series(
		'pull',
		'postcss',
		gulp.parallel(
			'compress-js',
			'compress-css',
		),
		'webpack',
		'zip',
	);

	gulp.task( 'package', task );
};
