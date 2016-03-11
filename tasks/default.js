var gulp     = require( 'gulp' );
var sequence = require( 'run-sequence' ).use( gulp );

var default_task = function( cb ) {
  'use strict';

  sequence(
    'sass',
    [
      'compress-css',
      'compress-js'
    ],
    cb
  );
};

gulp.task( 'default', default_task );
module.exports = default_task;
