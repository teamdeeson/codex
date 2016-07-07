'use strict';

// todo: add handle bar layouts
var source = require('vinyl-source-stream'),
    fs = require('fs');

module.exports = function (gulp, plugins) {

    return function (done) {
        var templateData = JSON.parse(fs.readFileSync('./src/templates/data.json', 'utf8')),
            options = {
                ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
                batch : ['./src/templates/partials'],
                helpers : {
                    capitals : function(str){
                        return str.toUpperCase();
                    }
                }
            };

        function get_type(thing){
            if(thing===null)return "[object Null]"; // special case
            return Object.prototype.toString.call(thing);
        }

        return gulp.src('./src/templates/**.handlebars')
            .pipe(plugins.compileHandlebars(templateData
                , options))
            .pipe(plugins.rename({extname: '-handlebars.html'}))
            .pipe(gulp.dest('deeson-theme'));

    };
};