module.exports = function( gulp ) {
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
