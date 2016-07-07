'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  browserSync = require('browser-sync'),
  getLmnTask = require('lmn-gulp-tasks');

global.dieOnError = true;

global.onError = function (err) {
  browserSync.notify(err.message, 3000);

  plugins.util.log(err.message, plugins.util.colors.magenta('123'));
  plugins.util.beep();

  this.emit('end'); // jshint ignore: line
};

function getTask(name, options) {
  return require('./gulp-tasks/' + name)(gulp, plugins, options);
}

gulp.task('auto-reload', getTask('auto-reload'));

gulp.task('clean', getLmnTask('clean', {
  src: './dist/'
}));

gulp.task('images', getTask('images'));

gulp.task('html', getTask('html'));
gulp.task('js', ['js-quality'], getTask('js'));

gulp.task('js-quality', getLmnTask('js-quality', {
  src: './src/js/**/*.js',
  dieOnError: true
}));

gulp.task('style', getTask('style', {
  src: './src/scss/*.scss',
  dest: './dist/css',
  imagePath: '../img/',
  includePaths: ['normalize.css']
}));
gulp.task('move-fonts', getLmnTask('copy', {
  src: './src/fonts/**.*',
  dest: './dist/fonts/'
}));

gulp.task('default', ['html', 'js', 'style', 'images', 'move-fonts'], getTask('default'));

