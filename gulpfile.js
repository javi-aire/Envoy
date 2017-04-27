/* gulp plugins */
var gulp = require('gulp'),
    browser = require('browser-sync'),
    runSeq = require('run-sequence'),

/*
* map of paths for using with tasks
*/
    paths = {
      entry: '',
      js: '',
      toCopy: '',
      html: '',
      dest: 'dist'
    };

gulp.task('serve', function(){
  browser({
    port: process.env.PORT || 7200,
    ghostMode: false,
    open: false,
    server: {
      index: 'index.html'
    }
  });
});

gulp.task('default', function(done){
  runSeq('serve', done);
});

