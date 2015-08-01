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
    browserReload = browserSync.reload;





//////////////////////////////////////////////////////
///     Set File Paths
//////////////////////////////////////////////////////

var basePath = {
  dev  : './builds/dev/',
  prod : './builds/prod/'
};

var devAssets = {
  styles  : basePath.dev + 'less/',
  scripts : basePath.dev + 'js/',
  images  : basePath.dev + 'images/'
};

var prodAssets = {
  styles  : basePath.prod + 'css/',
  scripts : basePath.prod + 'js/',
  images  : basePath.prod + 'images/'
};

// Array of Javascript assets listed in the order you want to concatenate
var jsAssets = [ devAssets.scripts + 'script.js'];





//////////////////////////////////////////////////////
///     Gulp Tasks
//////////////////////////////////////////////////////

// Less Task
gulp.task('pre-process', function(){
      return gulp.src( devAssets.styles + 'project.less')
      .pipe(plumber({errorHandler: onError}))
      .pipe(size({ title: "Source file", showFiles: true}))
      .pipe(less())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(minifyCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(prodAssets.styles))
      .pipe(size({ title: "Compressed file", showFiles: true}))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({ message: 'Less task complete' }));
});


// Scripts Task
gulp.task('scripts', function() {
	return gulp.src(jsAssets)
    .pipe(plumber({errorHandler: onError}))
    .pipe(size({ title: "Source file", showFiles: true}))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
    .pipe(concat('script.min.js'))
	.pipe(gulp.dest(prodAssets.scripts))
    .pipe(size({ title: "Compressed file", showFiles: true}))
    .pipe(browserSync.reload({stream:true}))
	.pipe(notify({ message: 'Scripts task complete' }));
});


// Initialize Browser-sync
gulp.task('set-server', function() {
    browserSync.init(null, {
        server: {
            baseDir: basePath.prod
        },
        port: 3000
    });
});


// Reload Browsers
gulp.task('reload', function () {
    browserSync.reload();
});


// Minify HTML Task
gulp.task('minify-html', function() {
    return gulp.src( basePath.dev + '*.html')
    .pipe(plumber({errorHandler: onError}))
    .pipe(size({ title: "Source file", showFiles: true}))
    .pipe(minifyHTML({
          conditionals: true,
          spare:true
    }))
    .pipe(gulp.dest(basePath.prod))
    .pipe(size({ title: "Compressed file", showFiles: true}))
    .pipe(browserSync.reload({stream:true}))
	.pipe(notify({ message: 'HTML task complete' }));
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
gulp.task('default', ['pre-process', 'scripts', 'minify-html', 'set-server'], function(){
      gulp.watch( devAssets.styles + '*.less', ['pre-process']);
      gulp.watch( devAssets.scripts + '*.js', ['scripts']);
      gulp.watch(basePath.dev + '*.html', ['minify-html']);
      gulp.watch(prodAssets.images + '**', ['reload']);
});
