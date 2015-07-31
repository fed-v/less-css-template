// Gulp tasks

// Load required plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require( 'gulp-notify' ),                   // Pop-up notifications. For log messages you can use 'gulp-util'.
    plumber = require('gulp-plumber'),                   // Prevents gulp.watch from crashing.
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
    size = require('gulp-size'),                         // Logs out the total size of files in the stream
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),                     // Concats JS files in a single file (in case we have more than one JS library)
    minifyHTML = require('gulp-minify-html'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload;


// Store Javascript source files in an array in the order you want to combine them.
var jsSources = ['./builds/dev/js/script.js'];


// Less task
gulp.task('pre-process', function(){
      return gulp.src('./builds/dev/less/project.less')
      .pipe(plumber({errorHandler: onError}))
      .pipe(size({ title: "Source file", showFiles: true}))
      .pipe(less())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(minifyCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('./builds/prod/css/'))
      .pipe(size({ title: "Compressed file", showFiles: true}))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({ message: 'Less task complete' }));
});


// Scripts task
gulp.task('scripts', function() {
	return gulp.src(jsSources)
    .pipe(plumber({errorHandler: onError}))
    .pipe(size({ title: "Source file", showFiles: true}))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
    .pipe(concat('script.min.js'))
	.pipe(gulp.dest('./builds/prod/js/'))
    .pipe(size({ title: "Compressed file", showFiles: true}))
    .pipe(browserSync.reload({stream:true}))
	.pipe(notify({ message: 'Scripts task complete' }));
});


// Initialize browser-sync which starts a static server also allows for browsers to reload on filesave
gulp.task('set-server', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./builds/prod/"
        },
        port: 3000
    });
});


// Reload browsers
gulp.task('reload', function () {
    browserSync.reload();
});


// Minify HTML task
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./builds/dev/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./builds/prod/'))
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


/*
   DEFAULT TASK
 • Process less then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or less files
*/
gulp.task('default', ['pre-process', 'scripts', 'minify-html', 'reload', 'set-server'], function(){
  gulp.start('pre-process');
  gulp.watch('./builds/dev/less/**/*.less', ['pre-process']);
  gulp.watch('./builds/prod/css/styles.min.css', ['reload']);
  gulp.watch(['./builds/dev/*.html'], ['minify-html']);
  gulp.watch('./builds/dev/js/*.js', ['scripts']);
});
