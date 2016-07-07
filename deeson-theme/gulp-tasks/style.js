'use strict';

var path = require('path');
var findNodeModules = require('find-node-modules');
var rev = require('../lib/rev');
var sassNpmImporter = require('../lib/sass-npm-importer');
var through = require('through2');

var browserslist = require('browserslist'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano');

module.exports = function (vinyl, plugins, options) {
    return function sassTask() {

        if (typeof options.minify !== 'boolean') {
            options.minify = process.env.MINIFY_ASSETS || false;
        }

        if (typeof options.sourcemaps !== 'boolean') {
            options.sourcemaps = process.env.SOURCEMAPS || true;
        }

        var manifest = 'rev-manifest.json';
        if (options.manifest) {
            manifest = path.join(options.manifest, manifest);
        }

        var includePaths;
        if (options.includePaths === false) {
            includePaths = [];
        } else {
            includePaths = findNodeModules({ relative: false });

            if (Array.isArray(options.includePaths)) {
                includePaths = includePaths.concat(options.includePaths);
            }
        }

        function imageUrl(imagePath) {
            var returnPath = (options.imagePath || '') + path.join('/', imagePath.getValue());
            return new plugins.sass.compiler.types.String('url("' + returnPath + '")');
        }

        var ignore = options.ignoreSuckyAntipattern;

        return vinyl.src(options.src)
            .pipe(plugins.plumber({ errorHandler: global.onError }))
            .pipe(ignore ? through.obj() : plugins.contains('../node_modules'))
            .pipe(options.sourcemaps ? plugins.sourcemaps.init() : through.obj())

            // Sourcemap start
            .pipe(plugins.sass({
                functions: { 'image-url($imagePath)': imageUrl },
                includePaths: includePaths, // @todo: Deprecate includePaths?
                importer: sassNpmImporter
            }))
            .on('error', global.onError) // For some reason gulp-plumber doesn't like -compass
            .pipe(plugins.concat('all.css'))
            .pipe(plugins.postcss([
                autoprefixer({browsers: browserslist()}),
                cssnano({
                    autoprefixer: false
                })
            ]))
            .pipe(options.rev ? plugins.fingerprint(manifest, {
                prefix: '/'
            }) : through.obj())
            // Sourcemap end

            .pipe(options.sourcemaps ? plugins.sourcemaps.write('./') : through.obj())
            .pipe(vinyl.dest(options.dest))
            .pipe(rev(vinyl, plugins, options));
    };
};