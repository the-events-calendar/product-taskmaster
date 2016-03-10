var gulp   = require( 'gulp' );
var fs     = require( 'fs' );
var zip    = require( 'gulp-vinyl-zip' ).zip;

var zip_task = function() {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );
  var zip_include = JSON.parse( fs.readFileSync( './package-whitelist.json' ) );

  return gulp.src( zip_include, { base: '.' } )
    .pipe( zip( json._zipname + '.' + json.version + '.zip' ) )
    .pipe( gulp.dest( '../' ) );
};

gulp.task( 'zip', zip_task );
module.exports = zip_task;
