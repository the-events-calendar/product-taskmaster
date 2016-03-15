var gulp     = require( 'gulp' );
var sequence = require( 'run-sequence' ).use( gulp );

var package_task = function( cb ) {
  'use strict';

  sequence(
    'pull',
    [
      'compress-js',
      'compress-css'
    ],
    'zip',
    cb
  );
};

gulp.task( 'package', package_task );
module.exports = package_task;
