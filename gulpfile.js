/*jslint node: true */
/*global require, console*/

'use strict';

//////////////////////////////////////////////////////
///     Load Required Plugins
/////////////////////////////////////////////////////

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require( 'gulp-notify' ),                   // Pop-up notifications.
    plumber = require('gulp-plumber'),                   // Prevents gulp.watch from crashing.
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
    size = require('gulp-size'),                         // Logs out the total size of files in the stream
    autoprefixer = require('gulp-autoprefixer'),         // Parses CSS files and adds vendor prefixes to CSS rules
    minifyCSS = require('gulp-minify-css'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),                     // Concats JS files in a single file (in case we have more than one JS library)
    minifyHTML = require('gulp-minify-html'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    changed = require('gulp-changed');                  // Checks if the file in stream has changed before continuing





//////////////////////////////////////////////////////
///     Declare Variables
//////////////////////////////////////////////////////

// Set File Paths
var BASE_PATH = {
  dev  : './builds/dev/',
  prod : './builds/prod/'
};

var DEV_ASSETS = {
  styles  : BASE_PATH.dev + 'less/',
  scripts : BASE_PATH.dev + 'js/',
  images  : BASE_PATH.dev + 'images/'
};

var PROD_ASSETS = {
  styles  : BASE_PATH.prod + 'css/',
  scripts : BASE_PATH.prod + 'js/',
  images  : BASE_PATH.prod + 'images/'
};

// Array of Javascript assets listed in the order you want to concatenate
var JS_ASSETS = [ DEV_ASSETS.scripts + 'script.js' ];

// Browser Definitions for Autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
  'safari >= 5',
  'opera 12.1',
];


//////////////////////////////////////////////////////
///     Gulp Tasks
//////////////////////////////////////////////////////

// Less Task
gulp.task('pre-process', function() {
      return gulp.src(DEV_ASSETS.styles + 'project.less')
      .pipe(plumber({ errorHandler: onError }))
      .pipe(size({ title: "Source file", showFiles: true }))
      .pipe(less())
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(minifyCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(PROD_ASSETS.styles))
      .pipe(size({ title: "Compressed file", showFiles: true }))
      .pipe(browserSync.reload({ stream:true }))
      .pipe(notify({ message: 'Less task complete' }));
});


// Scripts Task
gulp.task('scripts', function() {
	return gulp.src(JS_ASSETS)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
    .pipe(concat('script.min.js'))
	.pipe(gulp.dest(PROD_ASSETS.scripts))
    .pipe(size({ title: "Compressed file", showFiles: true }))
    .pipe(browserSync.reload({ stream:true } ))
	.pipe(notify({ message: 'Scripts task complete' }));
});


// Initialize Browser-sync
gulp.task('set-server', function() {
    browserSync.init(null, {
        server: {
            baseDir: BASE_PATH.prod
        },
        port: 3000
    });
});


// Reload Browsers
gulp.task('reload', function () {
    browserSync.reload();
});


// Minify HTML Task (only those files that have changed!)
gulp.task('minify-html', function() {
    return gulp.src(BASE_PATH.dev + '*.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
    .pipe(changed(BASE_PATH.prod))
    .pipe(minifyHTML({
          conditionals: true,
          spare:true
    }))
    .pipe(gulp.dest(BASE_PATH.prod))
    .pipe(size({ title: "Compressed file", showFiles: true }))
    .pipe(browserSync.reload({ stream:true }))
	.pipe(notify({ message: 'HTML task complete' }));
});


// Image Optimization Task (Run this task before uploading project to server.)
// I consider this a one shot task and, as such, I don’t include it in my watch task.
gulp.task('images', function() {
    return gulp.src(PROD_ASSETS.images + '**/*.{gif,jpg,png}')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 5,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill:false }],
        use: [ pngquant() ]
    }))
    .pipe(gulp.dest(PROD_ASSETS.images))
    .pipe(size({ title: "Compressed file", showFiles: true }))
	.pipe(notify({ message: 'Images task complete' }));
});


// Error Handler
var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);

    this.emit('end');
    console.log(err);
};


// Default Task
gulp.task('default', ['pre-process', 'scripts', 'minify-html', 'images', 'set-server'], function() {
      gulp.watch( DEV_ASSETS.styles + '**/*.less', ['pre-process'] );
      gulp.watch( DEV_ASSETS.scripts + '**/*.js', ['scripts'] );
      gulp.watch( BASE_PATH.dev + '**/*.html', ['minify-html'] );
      gulp.watch( PROD_ASSETS.images + '**', ['reload'] );         // Watch for changes in any of the prod images
});
