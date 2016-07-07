'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function (gulp) {
  return function () {
    var bundler = browserify('./src/js/app.js');

    return bundler.bundle()
      .on('error', console.log.bind(console, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('./deeson-theme/js'));
  };
};
