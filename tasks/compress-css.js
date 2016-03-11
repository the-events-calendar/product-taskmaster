var gulp    = require( 'gulp' );
var fs      = require( 'fs' );
var cssnano = require( 'gulp-cssnano' );
var rename  = require( 'gulp-rename' );

var css_task = function() {
  'use strict';

  var dir = 'src/resources/css';

  try {
    fs.statSync( dir );
  } catch( err ) {
    dir = 'resources';
  }

  return gulp.src( [
    dir + '/*.css',
    '!' + dir + '/*.min.css',
  ] )
    .pipe( cssnano() )
    .pipe(
      rename( {
        extname: '.min.css'
      } )
    )
    .pipe( gulp.dest( dir ) );
};

gulp.task( 'compress-css', css_task );
module.exports = css_task;
