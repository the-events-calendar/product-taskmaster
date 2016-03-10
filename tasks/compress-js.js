var gulp   = require( 'gulp' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );

var js_task = function() {
  'use strict';

  return gulp.src( [
    'src/resources/js/*.js',
    '!src/resources/js/*.min.js'
  ] )
    .pipe( uglify() )
    .pipe(
      rename( {
        extname: '.min.js'
      } )
    )
    .pipe( gulp.dest( 'src/resources/js' ) );
};

gulp.task( 'compress-js', js_task );
module.exports = js_task;
