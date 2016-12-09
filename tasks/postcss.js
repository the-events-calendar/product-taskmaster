var gulp        = require( 'gulp' );
var header      = require('gulp-header');
var postcss     = require( 'gulp-postcss' );
var cssnext     = require( 'postcss-cssnext' );
var cssimport   = require( 'postcss-import' );
var cssnested   = require( 'postcss-nested' );
var cssmixins   = require( 'postcss-mixins' );
var cssmqpacker = require( 'css-mqpacker' );
var rename      = require( 'gulp-rename' );

var postcss_task = function() {
  'use strict';

  var processors = [
    cssimport(),
    cssmixins(),
    cssnested(),
    cssnext(),
    cssmqpacker()
  ];

  var banner = [
    '/**',
    ' * This CSS file was auto-generated via PostCSS',
    ' *',
    ' * Contributors should avoid editing this file, but instead edit the associated',
    ' * src/resources/postcss/ file. For more information, check out our engineering',
    ' * docs on how we handle CSS in our engineering docs.',
    ' *',
    ' * @see: http://moderntribe.github.io/products-engineering/css/',
    ' */',
    '',
    '',
  ].join( '\n' );

  return gulp.src( [
    './src/resources/postcss/**/*.pcss',
    '!./src/resources/postcss/**/_*.pcss',
  ] )
    .pipe( postcss( processors ) )
    .pipe( header( banner ) )
    .pipe(
      rename( {
        extname: '.css'
      } )
    )
    .pipe( gulp.dest( './src/resources/css' ) );
};

module.exports = function( gulp ) {
  gulp.task( 'postcss', postcss_task );
};