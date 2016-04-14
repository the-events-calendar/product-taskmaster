var gulp        = require( 'gulp' );
var postcss     = require( 'gulp-postcss' );
var cssnext     = require( 'postcss-cssnext' );
var cssimport   = require( 'postcss-import' );
var cssnested   = require( 'postcss-nested' );
var cssmixins   = require( 'postcss-mixins' );
var cssmqpacker = require( 'css-mqpacker' );

var postcss_task = function() {
	'use strict';

	var processors = [
		cssimport(),
		cssmixins(),
		cssnested(),
		cssnext(),
		cssmqpacker(),
	];

	return gulp.src( './src/resources/postcss/*.css' )
		.pipe( postcss( processors ) )
		.pipe( gulp.dest( './src/resources/css' ) );
};

gulp.task( 'postcss', postcss_task );
module.exports = postcss_task;
