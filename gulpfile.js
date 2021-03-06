/*jslint node: true */
/*global require, console*/

'use strict';

//////////////////////////////////////////////////////
///     Load Required Dependencies
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
    minifyHTML = require('gulp-minify-html'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    changed = require('gulp-changed'),                  // Checks if the file in stream has changed before continuing
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    jasmine = require('gulp-jasmine'),                  // Javascript behavior-driven development framework for testing
    config = require('./config.json');                  // Import JSON file with all environmental variables





//////////////////////////////////////////////////////
///     Gulp Tasks
//////////////////////////////////////////////////////

// Clean Task: Removes CSS, Javascript and HTML files from production environment
// for a clean start.
gulp.task('clean', function(cb) {
    del([
        config.PROD_ASSETS.styles + '*',
        config.PROD_ASSETS.scripts + 'script.min.js',
        config.DEV_ASSETS.scripts + 'bundled.js',
        config.BASE_PATH.prod + 'index.html'
    ], cb);
});


// Less Task: Compiles less files into one minified css file and
// pipes the result to production folder.
gulp.task('styles', function() {
    return gulp.src(config.DEV_ASSETS.styles + 'project.less')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
    .pipe(less())
    .pipe(autoprefixer(config.AUTOPREFIXER_BROWSERS))
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(config.PROD_ASSETS.styles))
    .pipe(size({ title: "Compressed file", showFiles: true }))
    .pipe(browserSync.reload({ stream:true }))
    .pipe(notify({ message: 'Styles task complete' }));
});


// Browserify Task: Bundles all client-side Javascript code into one file
gulp.task('browserify', function() {
    return browserify({ entries: [config.DEV_ASSETS.scripts + 'script.js'] }, { debug: true })
    .bundle()
    .on('error', onError)
    .pipe(source('bundled.js'))
    .pipe(gulp.dest(config.DEV_ASSETS.scripts))
	.pipe(notify({ message: 'Browserify task complete' }));
});


// Scripts Task: Fetches Bundled javascript file and uglifies it.
// Then pipes the result to production folder.
gulp.task('scripts', ['browserify'], function() {       // Don't start 'scripts' until 'browserify' has finished!
	return gulp.src(config.DEV_ASSETS.scripts + 'bundled.js')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
    .pipe(rename('script.min.js'))
	.pipe(gulp.dest(config.PROD_ASSETS.scripts))
    .pipe(size({ title: "Compressed file", showFiles: true }))
    .pipe(browserSync.reload({ stream:true } ))
	.pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('jasmine', ['scripts'], function () {
	return gulp.src('spec/test.js')     // gulp-jasmine works on filepaths so you can't have any plugins before it
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jasmine())
    .pipe(notify({ message: 'Jasmine task complete' }));
});

// Set-server task: Creates a server in port 3000 using Browser-sync and
// opens default browser in that localhost. Page is reloaded on change.
gulp.task('set-server', function() {
    browserSync.init(null, {
        server: {
            baseDir: config.BASE_PATH.prod
        },
        port: 3000
    });
});


// Reload Browser
gulp.task('reload', function () {
    browserSync.reload();
});


// Minify HTML Task (only those files that have changed!)
gulp.task('minify-html', function() {
    return gulp.src(config.BASE_PATH.dev + '*.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
    .pipe(changed(config.BASE_PATH.prod))
    .pipe(minifyHTML({
          conditionals: true,
          spare:true
    }))
    .pipe(gulp.dest(config.BASE_PATH.prod))
    .pipe(size({ title: "Compressed file", showFiles: true }))
    .pipe(browserSync.reload({ stream:true }))
	.pipe(notify({ message: 'HTML task complete' }));
});


// Image Optimization Task: (Run this task before uploading project to server.)
// I consider this a one shot task and, as such, I don’t include it in my watch task.
gulp.task('images', function() {
    return gulp.src(config.PROD_ASSETS.images + '**/*.{gif,jpg,png}')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(size({ title: "Source file", showFiles: true }))
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 5,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill:false }],
        use: [ pngquant() ]
    }))
    .pipe(gulp.dest(config.PROD_ASSETS.images))
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


// Default Task: Executes all the declared tasks except clean and watches
// development environment for any changes made.
gulp.task('default', ['styles', 'browserify', 'scripts', 'jasmine', 'minify-html', 'images', 'set-server'], function() {
    gulp.watch( config.DEV_ASSETS.styles + '**/*.less', ['styles'] );
    gulp.watch( config.DEV_ASSETS.scripts + '**/*.js', ['browserify', 'scripts', 'jasmine'] );
    gulp.watch( config.BASE_PATH.dev + '**/*.html', ['minify-html'] );
    gulp.watch( config.PROD_ASSETS.images + '**', ['reload'] );         // Watch for changes in any of the prod images
});
