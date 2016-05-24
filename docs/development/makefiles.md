_Work in progress ..._

All project automation or commands should be abstracted into the root level `Makefile`. This allows the
industry standard make command to be used to execute individual tasks and describes precisely, in code,
what each build task comprises of.

The following are the minimum expected tasks a project should define in its Makefile:

Download all library dependencies and build all static assets :-

      make build

Run all the project's tests :-

     make test

Delete all static assets and external library dependencies :-

      make clean

#### Running on different environments

These commands all assume the local vdd environment. When building on a different environment it will need passing in
via the ENVIRONMENT parameter where appropriate like this:

    make build ENVIRONMENT=prod