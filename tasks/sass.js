var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );

var sass_task = function() {
  'use strict';

  return gulp.src( './src/resources/scss/**/*.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './src/resources/css' ) );
};

gulp.task( 'sass', sass_task );
module.exports = sass_task;
