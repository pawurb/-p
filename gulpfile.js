var gulp   = require('gulp');
var watch  = require('gulp-watch');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');

var swallowErr = function(err) {
  console.log(err.toString());
}

gulp.task('default', function() {
  gulp.start('lint', 'test');
  gulp.watch(['p.js', 'test/*js'], ['lint', 'test'])
});

gulp.task('lint', function() {
  gulp.src(['./p.js', './test/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
  gulp.src('./test/*_test.js', { read: false })
  .pipe(mocha({reporter: 'nyan'}))
  .on('error', swallowErr);
});
