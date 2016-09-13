# Deeson handbook

Deeson is a Digital Agency in Europe https://www.deeson.co.uk

This is our internal processes and best practices, open to the world and accessible at https://handbook.deeson.co.uk

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

If you have the python package manager, pip installed, then you just
need to install mkdocs once like this

    pip install mkdocs

Once you have mkdocs installed, you just need to run the following
from the root of the checked out project directory:

    mkdocs serve
    
You should now see the project running on your local machine here
http://127.0.0.1:8000/
