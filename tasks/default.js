var gulp     = require( 'gulp' );
var sequence = require( 'run-sequence' ).use( gulp );

var default_task = function( cb ) {
  'use strict';

  sequence(
    'postcss',
    [
      'compress-css',
      'compress-js'
    ],
    cb
  );
};

module.exports = function( gulp ) {
  gulp.task( 'default', default_task );
};