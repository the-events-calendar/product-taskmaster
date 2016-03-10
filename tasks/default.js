var gulp     = require( 'gulp' );
var sequence = require( 'run-sequence' ).use( gulp );

var default_task = function( cb ) {
  'use strict';

  sequence( [
    'compress-js',
    'compress-css'
  ], cb );
};

gulp.task( 'default', default_task );
module.exports = default_task;
