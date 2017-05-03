/* *
*
* gulp plugins
*
*/
var gulp = require('gulp'),
    browser = require('browser-sync'),
    runSeq = require('run-sequence'),
    imageMin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    htmlMin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),


/**
* object map of paths for using with tasks
*/
    paths = {
      entry: './client/**/*',
      js: 'client/js/**/*.js',
      images: './client/assets/**/*',
      html: './client/*.html',
      css: './client/scss/**/*.scss',
      dest: 'dist'
    };

/**
* compile sass
*/
gulp.task("sass", function() {
  gulp.src(paths.css)
      .pipe(sass())
      .pipe(gulp.dest("dist/css"))
      .pipe(browser.reload({
        stream: true
      }));
});


/**
* Minify html
*/
gulp.task('html', ['sass'], function() {
  gulp.src(paths.html)
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});

/**
* Minify JS
*/
gulp.task('uglify', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + '/js'));
});

/**
* Minify images
*/
gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(imageMin())
    .pipe(gulp.dest(paths.dest + '/assets'));
});

/**
* Watch files for changes
*/
gulp.task('watch', ['serve', 'html', 'uglify', 'sass'], function() {
  gulp.watch(paths.css, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.js, ['uglify']);
  // gulp.watch(paths.js, [''])
});

gulp.task('serve', function(){
  browser({
    port: process.env.PORT || 7200,
    ghostMode: false,
    open: false,
    server: {
      baseDir: 'dist',
      routes : {
        '/node_modules' : './node_modules'
      }
    }
  });
});

gulp.task('default', function(done){
  runSeq('serve', done);
});

