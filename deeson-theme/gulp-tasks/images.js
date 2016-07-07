'use strict';

var pngquant = require('imagemin-pngquant');

module.exports = function (gulp, plugins) {

    return function() {

        return gulp.src('./src/img/*')
            .pipe(plugins.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('./deeson-theme/img/'));

    };
};