Front end standards
===================

- Ensure the browser support base has been signed off by the client before starting work.
- Use SVGs where possible
- CSS. use components and keep them isolated - BEM is suggested but there are other solutions (scoped css etc). Use classes for selectors and try and avoid element and attribute/id selectors.
- CSS preprocessor. Don't use mixins for things that PostCSS can do. Use one that is a superset of CSS rather than a completely different syntax. Suggest SASS (SCSS) or using post processing (such as PostCSS).
- JS do not pollute the global namespace - suggest using ES6 modules or commonJS
- Use a package manager when including external resources (inc. plugins), suggest NPM.
- File structure, keep it tidy - suggest similar to [the boilerplate] https://bitbucket.org/deesongroup6346/bootstrap_boilerplate/src/0c8b36af709c?at=master particularly for SASS
- To keep the codebase clean; where possible do any legacy compatibility stuff as part of the build, vendor prefixes and CSS hacks can usually be added using tools such as postCSS, ES6 can be turned into ES5 via tools such as Babel. 
- When using tools such as Gulp, Webpack etc. install using a package manager and run binaries locally. An example of running local Gulp installed with NPM (rather than installing using the global flag `-g`): `./node_modules/.bin/gulp` or adding a `script` entry in package.json that runs `gulp`
- Keep the build process simple. Suggest writing to single list folder/bundle file.
- Use scripts to run build (if necessary), suggest nam scripts in package.json - document these in a readme.MD. Assume use of a CI server for production build even if this ends up being a manual step.

Tools
-----

### DeePub

DeePub is a tool we use for publishing frontend HTML/CSS/JS for clients to preview.
Your frontend application will then be available at https://preview.deeson.net

Instructions for installing the deepub command line tool can be [found here](https://bitbucket.org/deesongroup6346/deepub).
