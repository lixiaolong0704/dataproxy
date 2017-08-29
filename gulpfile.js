var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var minify = require('gulp-minify');
//var sh = require('shelljs');
//var webpack = require('gulp-webpack');





gulp.task('style', function () {


  console.log("------------------");
  return sass('./public/sass/**/*.scss', {
    precision: 6,
    stopOnError: true,
    verbose: true,
    style: 'expanded',
    loadPath: ['library', './public/sass/']
  })
    .on('error', sass.logError)
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('style:watch', function (cb) {

  gulp.watch('./public/sass/**/*.*', ['style']);

});


//var exec = require('child_process').exec;
//var path = require('path');
//var dir = path.resolve("./");


//gulp.task('default', function (cb) {
//
//  //gulp.run(['js']);
//
//  gulp.run(['wp']);
//  gulp.run(['style']);
//  //gulp.watch('./www/js/**/*.js', ['js']);
//  //gulp.watch('./lib/spliter.js', ['js']);
//
//  //gulp.watch('./www/lib/ionic/scss/**/*.*',['ionic_sass']);
//  exec("ionic serve", function (err, stdout, stderr) {
//    //console.log(filePath+stdout);
//  });
//  gulp.watch('./www/scss/**/*.*', ['style']);
//});
