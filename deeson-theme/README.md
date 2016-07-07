Frontend folder
===============

1. Clone this (https://bitbucket.org/deesongroup6346/bootstrap_boilerplate/) into existing or as a new GIT repository (or download files)
2. Run the following commands (from frontend folder)
   1. Install node modules locally: `$ npm install`
   2. Run gulp: `$ ./node_modules/.bin/gulp` (or `$ gulp` if you have it installed globally)
4. Go to http://localhost:3001/ to see Browsersync options

Custom browser support
======================

To change which browsers are supported please edit the `browserslist` file in the project root. This file is used by Autoprefixer to add vendor prefixes (such as `-webkit-border-radius`). See https://github.com/ai/browserslist for details - if we have GA data we can import this into caniuse.com and generate a custom `browserslist` file.

Notes
=====
- *Compass* is no longer supported, if there is any *Compass* specific functionality needed please consider using a Post-CSS plugin and adding to the bootstrap-sass gulp task.
- *Compass* was removed to break the dependency on *Ruby* being installed on the dev/production server
- Browser prefixes are handled automatically by Autoprefixer (https://github.com/postcss/autoprefixer) - as a bonus any old/unnecessary prefixes (such as `-webkit-border-radius`) will now get removed. Configure browser in the `browserslist` file.
- Templates now use *Handlerbars* http://handlebarsjs.com/ - the boilerplate comes with a basic page with header/footer example partials. Feel free to ignore/hack these within a new project.
- The default *Gulp* task now uses BrowserSync and will watch templates, scss, images, and js and show changes instantly in the browser - check out http://localhost:3001/ for details of where to point devices for testing.
- Images + SVGs (placed in `src/img`) will be automatically optimised + there is an lossless option to make all JPEGs progressive
- There are Gulp tasks to copy over JS and fonts from the bootstrap node module, for other node module such as Chosen just copy these tasks and modify if you need them in your project.
- To include SASS from node modules you can include the node module name in the _style_ gulp task like so `includePaths: ['bootstrap-sass']` and then in your SCSS you can import from the root of that node module like so `@import "bootstrap-sass/assets/stylesheets/bootstrap";` (no need to put the 'node_module' part of the file path, this is an anti pattern).
- ESlint is now used for code linting and maintaining code standard within our JS. Implemented Drupal JS standards for now https://gist.github.com/frob/3dda829af59c456ef611
- Browserify is tasked to compile CommonJS modules http://browserify.org/ - some example modules are included in this project to demonstrate.

The Gulp stuff is based on https://www.npmjs.com/package/lmn-gulp-tasks and http://macr.ae/article/splitting-gulpfile-multiple-files.html