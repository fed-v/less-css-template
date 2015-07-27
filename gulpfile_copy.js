// Gulp tasks

// Load plugins
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    less = require('gulp-less'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    css = require('css'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload,
    concat = require('gulp-concat');


// Task that compiles scss files down to css
gulp.task('pre-process', function(){
  return gulp.src('less/project.less')
      .pipe(less())
      .pipe(size({gzip: false, showFiles: true, title:'un-prefixed css'}))
      .pipe(size({gzip: true, showFiles: true, title:'un-prefixed gzipped css'}))
      .pipe(prefix())
      .pipe(size({gzip: false, showFiles: true, title:'prefixed css'}))
      .pipe(size({gzip: true, showFiles: true, title:'prefixed css'}))
      .pipe(gulp.dest('css'))
      .pipe(minifyCSS())
      .pipe(rename('site.min.css'))
      .pipe(gulp.dest('./css/'))
      .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
      .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
      .pipe(browserSync.reload({stream:true}));
});


// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        },
        port: 3000
    });
});


// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


/*
   DEFAULT TASK
 • Process less then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or less files
*/
gulp.task('default', ['pre-process', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process');
  gulp.watch('less/**/*.less', ['pre-process']);
  gulp.watch('css/styles.min.css', ['bs-reload']);
  gulp.watch(['*.html'], ['bs-reload']);
});
