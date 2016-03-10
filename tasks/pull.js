var gulp    = require( 'gulp' );
var git     = require( 'gulp-git' );
var argv    = require( 'yargs' ).argv;
var notify  = require( 'gulp-error-notifier' ).notify;

var pull_task = function( cb ) {
  'use strict';

  var branch, returnbranch;

  if ( 'undefined' === typeof argv.branch ) {
    notify( new Error( 'ERROR: When packaging, you must provide a branch via --branch' ) );
    process.exit( 1 );
    return;
  } else {
    branch = argv.branch;
  }

  if ( 'undefined' === typeof argv.returnbranch ) {
    returnbranch = branch;
  } else {
    returnbranch = argv.returnbranch;
  }

  git.checkout( branch, function( error ) {
    if ( error ) {
      notify( new Error( error ) );
      process.exit( 1 );
      return;
    }

    git.pull( 'origin', branch, {}, function( error ) {
      if ( error ) {
        notify( new Error( error ) );
        process.exit( 1 );
        return;
      }

      git.updateSubmodule( { args: '--init --recursive' } );
      cb();
    } );
  } );
};

gulp.task( 'pull', pull_task );
module.exports = pull_task;
