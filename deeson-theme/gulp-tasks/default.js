'use strict';

var browserSync = require('browser-sync');

module.exports = function (gulp) {
  return function () {
    global.dieOnError = false;

    var config = {
      server: {
        baseDir: '.'
      },
      startPath: '/deeson-theme/index-handlebars.html',
      ghostMode: {
        scroll: false,
        links: false,
        forms: false
      }
    };

    if (process.argv.indexOf('--no-open') !== -1) {
      config.open = false;
    }

    if(process.env.NODE_ENV !== 'production') {

      browserSync.init([
        'dist/**/*.css',
        'dist/**/*.js',
        'dist/**/*.html',
        'src/img/**/*',
        'test/**/*.js'
      ], config);

      gulp.watch('src/scss/**/*.scss', ['style']);
      gulp.watch('src/js/**/*.js', ['js']);
      gulp.watch('src/templates/**/*.handlebars', ['html']);
      gulp.watch('src/*.html', ['move-mkdocs-templates']);
      gulp.watch('src/img/**/*.{gif,jpg,jpeg,png,svg}', ['images']);
    }
  };
};
