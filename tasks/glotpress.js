var gulp     = require( 'gulp' );
var fs       = require( 'fs' );
var download = require( 'gulp-download-stream' );
var request  = require( 'request' );

var glotpress_task = function( cb ) {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );

  var options = {
    domainPath : json._domainPath,
    url        : json._glotPressUrl,
    slug       : json._glotPressSlug,
    textdomain : json._textDomain,
    file_format: json._glotPressFileFormat,
    formats    : json._glotPressFormats,
    filter     : json._glotPressFilter
  };

  var api_url = options.url + '/api/projects/' + options.slug;

  request( api_url, function( error, response, body ) {
    if ( ! error && response.statusCode === 200 ) {
      var data = JSON.parse( body );
      var set, index, format;

      for ( index in data.translation_sets ) {
        set = data.translation_sets[ index ];

        if ( 0 === set.current_count ) {
          continue;
        }

        if ( options.filter.minimum_percentage > parseInt( set.percent_translated ) ) {
          continue;
        }

        for ( format in options.formats ) {

          var url = api_url + '/' + set.locale + '/' + set.slug + '/export-translations?format=' + options.formats[ format ];
          var info = {
            domainPath : options.domainPath,
            textdomain : options.textdomain,
            locale     : set.locale,
            wp_locale  : set.wp_locale,
            format     : options.formats[ format ]
          };

          if ( ! info.wp_locale ) {
            info.wp_locale = info.locale;
          }

          var filename = options.file_format.replace( /%(\w*)%/g, function( m, key ) {
            return info.hasOwnProperty( key ) ? info[ key ] : '';
          } );

          download( {
            file: filename,
            url: url
          } )
            .pipe( gulp.dest( 'lang/' ) );
        }
      }
    }

    cb();
  } );
};

gulp.task( 'glotpress', glotpress_task );
module.exports = glotpress_task;
