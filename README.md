# Deeson handbook

Deeson is a digital agency that specialises in designing and building transformative websites. You can read more about us at  https://www.deeson.co.uk.

This is our internal processes and best practices, open to the world and accessible at http://handbook.deeson.co.uk

## Editing the handbook

If you'd like to contribute to the handbook, its in a git repository so
go ahead and make a pull request. Deeson employees can edit files
directly in GitHub (find the page and click edit) or by using
[prose.io](https://prose.io)

## Building the handbook

There is no need to do this if you just want to edit the documentation.

This is if you want to do work locally and see the results before
committing them, its useful if you are working on the theme or are
just interested in how it all works.

This uses [MkDocs](https://mkdocs.readthedocs.io) to generate the
documentation. Check that link for the full guide.

To run a local copy of the site you can do it through Docker. If it's installed then just run:

`make docker-start`

You should now see the project running on your local machine here
http://127.0.0.1/

If you are making changes to the theme, you can rebuild the theme locally using docker:

`make docker-build`

Note that if you have ever built the theme locally outside of docker then you'll need to delete the `deeson-theme/node_modules` directory to redownload the node modules correctly for the Dockerised environment. This first build will be slow as everything is downloaded, but subsequent builds will be faster.
