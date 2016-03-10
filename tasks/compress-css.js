var gulp    = require( 'gulp' );
var cssnano = require( 'gulp-cssnano' );
var rename  = require( 'gulp-rename' );

var css_task = function() {
  'use strict';

  return gulp.src( [
    'src/resources/css/*.css',
    '!src/resources/css/*.min.css',
  ] )
    .pipe( cssnano() )
    .pipe(
      rename( {
        extname: '.min.css'
      } )
    )
    .pipe( gulp.dest( 'src/resources/css' ) );
};

gulp.task( 'compress-css', css_task );
module.exports = css_task;
