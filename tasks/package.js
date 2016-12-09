var gulp     = require( 'gulp' );
var sequence = require( 'run-sequence' ).use( gulp );

var package_task = function( cb ) {
  'use strict';

  sequence(
    'pull',
    'postcss',
    [
      'compress-js',
      'compress-css'
    ],
    'zip',
    cb
  );
};

module.exports = function( gulp ) {
  gulp.task( 'package', package_task );
};