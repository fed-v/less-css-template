// Gulp tasks

// Load plugins
var gulp = require('gulp'),
    notify = require( 'gulp-notify' ),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    css = require('css'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload,
    minifyHTML = require('gulp-minify-html');


// Less task
gulp.task('pre-process', function(){
      return gulp.src('./Builds/Dev/less/project.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(minifyCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('./Builds/Prod/css/'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({ message: 'Less task complete' }));
});


// Scripts task
gulp.task('scripts', function() {
	return gulp.src('./Builds/Dev/js/script.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('./Builds/Prod/js/'))
    .pipe(browserSync.reload({stream:true}))
	.pipe(notify({ message: 'Scripts task complete' }));
});


// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('set-server', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./Builds/Prod/"
        },
        port: 3000
    });
});


// Reload browsers
gulp.task('reload', function () {
    browserSync.reload();
});


gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./Builds/Dev/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./Builds/Prod/'))

    .pipe(browserSync.reload({stream:true}))
	.pipe(notify({ message: 'HTML Minified!' }));
});


/*
   DEFAULT TASK
 • Process less then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or less files
*/
gulp.task('default', ['pre-process', 'scripts', 'minify-html', 'reload', 'set-server'], function(){
  gulp.start('pre-process');
  gulp.watch('./Builds/Dev/less/**/*.less', ['pre-process']);
  gulp.watch('./Builds/Prod/css/styles.min.css', ['reload']);
  gulp.watch(['./Builds/Dev/*.html'], ['minify-html']);
  gulp.watch('./Builds/Prod/js/*.js', ['scripts']);
});
